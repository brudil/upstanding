/*
server application entry point
(none of this is run on the client)

*/

import express from 'express';
import React from 'react';
import _ from 'lodash';
import {
  ApolloClient,
  ApolloProvider,
  getDataFromTree,
  createNetworkInterface,
} from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { StaticRouter } from 'react-router';
import raven from 'raven';
import Html from './core/components/Html';
import forceSsl from './server/force-ssl';

require('isomorphic-fetch');

function renderFullPage(vertical, component, store) {
  return `
      <!doctype html>
      ${renderToString(
        <Html
          vertical={vertical}
          assets={global.webpack_isomorphic_tools.assets()}
          component={component}
          store={store}
        />
      )}
    `;
}

function hydrateOnClient(vertical, store) {
  return `
        <!doctype html>
        ${renderToString(
          <Html
            vertical={vertical}
            assets={global.webpack_isomorphic_tools.assets()}
            store={store}
          />
        )}
      `;
}

function onError(err, req, res) {
  res
    .status(500)
    .send(
      'Something unfortunate has happened. Perhaps your luck will get better, perhaps not.'
    );
}

function getVertical(host, verticals) {
  // eslint-disable-next-line
  for (const vertical of verticals) {
    if (vertical.server.hosts.indexOf(host) !== -1) {
      return vertical;
    }
  }

  return null;
}
function getVerifyValue(id, verticals) {
  // eslint-disable-next-line
  for (const vertical of verticals) {
    if (vertical.verify.hasOwnProperty(id)) {
      return vertical.verify[id];
    }
  }

  return null;
}

function getClientVerticalConfig(vertical) {
  const config = _.pick(vertical, ['name', 'lowdown', 'tracking', 'slug']);
  return () => config;
}

export default function server({ verticals, port }) {
  const app = express();

  const isProduction = process.env.NODE_ENV === 'production';

  /* handle rendering of application */
  function handleRender(req, res) {
    const vertical = getVertical(req.hostname, verticals);
    const context = {};
    console.log('Vertical: ', vertical.name);
    console.log('Serving: ', req.url);

    const LOWDOWN_HOST = process.env.LOWDOWN_HOST || 'http://localhost:8000';
    const networkInterface = createNetworkInterface({
      uri: `${LOWDOWN_HOST}/graphql/`,
    });

    const client = new ApolloClient({
      networkInterface,
    });

    const finalCreateStore = compose(applyMiddleware(client.middleware()))(
      createStore
    );

    const store = finalCreateStore(
      combineReducers({
        apollo: client.reducer(),
        config: getClientVerticalConfig(vertical),
      })
    );
    function handle404Error() {
      res.status(404).send(
        renderFullPage(
          <ApolloProvider store={store} key="provider">
            <StaticRouter location={req.url} context={context}>
              <vertical.Application />
            </StaticRouter>
          </ApolloProvider>,
          store
        )
      );
    }

    function handle500Error(err) {
      console.log(err);
      res.status(500).send(hydrateOnClient(vertical, store));
    }

    // todo: this might not be 200, check context
    getDataFromTree(
      <ApolloProvider store={store} client={client} key="provider">
        <StaticRouter location={req.url} context={context}>
          <vertical.Application />
        </StaticRouter>
      </ApolloProvider>
    )
      .then(() => {
        res.status(200).send(
          renderFullPage(
            vertical,
            <ApolloProvider store={store} client={client} key="provider">
              <StaticRouter location={req.url} context={context}>
                <vertical.Application />
              </StaticRouter>
            </ApolloProvider>,
            store
          )
        );
      })
      .catch(() => {
        res.status(500).send(hydrateOnClient(vertical, store));
      });

    // old shit

    // match(
    //   { routes: vertical.routes, location: req.url },
    //   (error, redirectLocation, renderProps) => {
    //     if (error) {
    //       return handle500Error(error);
    //     } else if (redirectLocation) {
    //       res.redirect(
    //         302,
    //         redirectLocation.pathname + redirectLocation.search
    //       );
    //     } else if (renderProps) {
    //     } else {
    //       return handle404Error();
    //     }
    //   }
    // );
  }

  if (isProduction) {
    app.use(
      raven.middleware.express.requestHandler(
        'https://d66a04a503884527974744137198af8b:f208cb25f879498191f64f06d678f2c6@app.getsentry.com/89728'
      )
    );
  }

  app.get('/.well-known/acme-challenge/:id', (req, res) => {
    const verifyId = req.params.id;
    const verifyValue = getVerifyValue(verifyId, verticals);

    res.send(verifyValue);
  });

  app.use('/dist', express.static(`${__dirname}/../dist`));
  app.use(forceSsl);
  app.use(handleRender);

  if (isProduction) {
    app.use(
      raven.middleware.express.errorHandler(
        'https://d66a04a503884527974744137198af8b:f208cb25f879498191f64f06d678f2c6@app.getsentry.com/89728'
      )
    );
  }

  app.use(onError);

  console.log(`Serving at port ${port}`);
  app.listen(port);
}
