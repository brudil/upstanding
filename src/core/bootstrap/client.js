/* eslint-env browser */
/*
 client side application entry point.
 (none of this is run on the server)

 */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import ScrollToTop from '../components/ScrollToTop';

function client({ name, slug, Application, tracking }) {
  process.env.LOWDOWN_VERTICAL_IDENTIFIER = slug;
  /* polyfill fetch */
  require('isomorphic-fetch');

  console.log(`UPSTANDING: ${name} v1. env: ${process.env.NODE_ENV}`);

  const LOWDOWN_HOST = process.env.LOWDOWN_HOST || 'http://localhost:8000';
  const networkInterface = createNetworkInterface({
    uri: `${LOWDOWN_HOST}/graphql/`,
  });
  const aClient = new ApolloClient({
    networkInterface,
  });

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production') {
    /* set up getsentry.com error reporting and tracking */
    Raven.config(tracking.sentry).install();

    /* initialize Google Analytics via ReactGA (hooks in to React Router */
    ReactGA.initialize(tracking.ga);
  }

  function logPageView() {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    } else {
      console.log('ga', { page: window.location.pathname });
    }
  }

  const middleware = [];

  middleware.push(applyMiddleware(aClient.middleware()));

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
      apollo: aClient.reducer(),
    }),
    window.__data
  );

  ReactDOM.render(
    <ApolloProvider store={store} client={aClient}>
      <Router>
        <ScrollToTop>
          <Application />
        </ScrollToTop>
      </Router>
    </ApolloProvider>,
    document.getElementById('app')
  );
}

export default client;
