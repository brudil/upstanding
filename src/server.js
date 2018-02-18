/*
server application entry point
(none of this is run on the client)

*/

import express from 'express';
import React from 'react';
import _ from 'lodash';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { StaticRouter } from 'react-router';
import Raven from 'raven';
import interactiveFrame from 'interactive-frame';
import Html from './core/components/Html';
import forceSsl from './server/force-ssl';

require('isomorphic-fetch');

const LOWDOWN_HOST = process.env.LOWDOWN_HOST || 'http://localhost:8000';

const assets = new Proxy({}, {
  get(target, name) {
    return {
      js: `http://localhost:8088/build/${name}.application.js`,
      css: `http://localhost:8088/build/${name}.style.css`,
    }
  }
}) || require('../assets.json');

function renderFullPage(vertical, component, store, client) {
  return `
      <!doctype html>
      ${renderToString(
        <Html
          vertical={vertical}
          assets={assets}
          component={component}
          store={store}
          client={client}
        />
      )}
    `;
}

function hydrateOnClient(vertical, store, client) {
  return `
        <!doctype html>
        ${renderToString(
          <Html
            vertical={vertical}
            assets={assets}
            store={store}
            client={client}
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

function getClientVerticalConfig(vertical) {
  const config = _.pick(vertical, ['name', 'lowdown', 'tracking', 'slug']);
  return () => config;
}

export default function server({ verticals, port }) {
  const app = express();

  Raven.config(
    'https://d66a04a503884527974744137198af8b:f208cb25f879498191f64f06d678f2c6@app.getsentry.com/89728'
  ).install();

  const isProduction = process.env.NODE_ENV === 'production';

  /* handle rendering of application */
  function handleRender(req, res) {
    const vertical = getVertical(req.hostname, verticals);
    const context = {};
    console.log('Vertical: ', vertical.name);
    console.log('Serving: ', req.url);

    const link = new HttpLink({
      uri: `${LOWDOWN_HOST}/graphql/`,
    });

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      ssrMode: true,
    });

    const finalCreateStore = compose()(createStore);

    const store = finalCreateStore(
      combineReducers({
        config: getClientVerticalConfig(vertical),
      })
    );
    function handle404Error() {
      res.status(404).send(
        renderFullPage(
          <Provider store={store} key="provider">
            <StaticRouter location={req.url} context={context}>
              <vertical.Application />
            </StaticRouter>
          </Provider>,
          store
        )
      );
    }

    function handle500Error(err) {
      console.log(err);
      res.status(500).send(hydrateOnClient(vertical, store, client));
    }

    // todo: this might not be 200, check context
    getDataFromTree(
      <Provider store={store} key="provider">
        <ApolloProvider client={client} key="apollo">
          <StaticRouter location={req.url} context={context}>
            <vertical.Application />
          </StaticRouter>
        </ApolloProvider>
      </Provider>
    )
      .then(() => {
        res.status(200).send(
          renderFullPage(
            vertical,
            <Provider store={store} key="provider">
              <ApolloProvider client={client} key="apollo">
                <StaticRouter location={req.url} context={context}>
                  <vertical.Application />
                </StaticRouter>
              </ApolloProvider>
            </Provider>,
            store,
            client
          )
        );
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(hydrateOnClient(vertical, store, client));
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
    app.use(Raven.requestHandler());
  }

  app.use('/dist', express.static(`${__dirname}/../dist`));
  app.use('/external/ogimage/:contentId', (req, res) => {
    const vertical = getVertical(req.hostname, verticals);
    const link = new HttpLink({
      uri: `${LOWDOWN_HOST}/graphql/`,
    });

    vertical.external(link, req, res);
  });
  app.use('/interactive-frame/:slug/v:rid', (req, res) => {
    const interactiveSlug = req.params.slug;
    const interactiveReleaseId = req.params.rid;
    res.send(
      interactiveFrame('latest')(
        `https://interactives.theprate.com/${interactiveSlug}/v${interactiveReleaseId}/bundle.js`
      )
    );
  });
  app.use(forceSsl);
  app.use(handleRender);

  if (isProduction) {
    app.use(Raven.errorHandler());
  }

  app.use(onError);

  console.log(`Serving at port ${port}`);
  app.listen(port);
}
