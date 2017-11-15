/* eslint-env browser */
/*
 client side application entry point.
 (none of this is run on the server)

 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Raven from 'raven-js';
import ScrollToTop from '../components/ScrollToTop';

function client({ name, slug, Application, tracking }) {
  process.env.LOWDOWN_VERTICAL_IDENTIFIER = slug;
  /* polyfill fetch */
  require('isomorphic-fetch');

  console.log(`UPSTANDING: ${name} v2. env: ${process.env.NODE_ENV}`);
  const LOWDOWN_HOST = process.env.LOWDOWN_HOST || 'http://localhost:8000';
  console.log(`[lowdown]: endpoint ${LOWDOWN_HOST}`);
  const link = new HttpLink({
    uri: `${LOWDOWN_HOST}/graphql/`,
  });
  const aClient = new ApolloClient({
    link,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production') {
    /* set up getsentry.com error reporting and tracking */
    Raven.config(tracking.sentry).install();
  }

  const initGA =
    process.env.NODE_ENV === 'production'
      ? history => {
          (function(i, s, o, g, r, a, m) {
            i.GoogleAnalyticsObject = r;
            (i[r] =
              i[r] ||
              function() {
                (i[r].q = i[r].q || []).push(arguments);
              }),
              (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
          })(
            window,
            document,
            'script',
            'https://www.google-analytics.com/analytics.js',
            'ga'
          );

          ga('create', tracking.ga, 'auto');
          ga('send', 'pageview');

          history.listen(location => {
            ga('send', 'pageview', location.pathname);
          });
        }
      : () => null;

  const middleware = [];

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const logger = require('redux-logger');

    applyMiddleware(logger);
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const finalCreateStore = composeEnhancers(...middleware)(createStore);

  const store = finalCreateStore(
    combineReducers({
      config: state => state || null,
    }),
    window.__data
  );

  const history = createBrowserHistory();

  initGA(history);

  ReactDOM.hydrate(
    <Provider store={store}>
      <ApolloProvider client={aClient}>
        <Router history={history}>
          <ScrollToTop>
            <Application />
          </ScrollToTop>
        </Router>
      </ApolloProvider>
    </Provider>,
    document.getElementById('app')
  );
}

export default client;
