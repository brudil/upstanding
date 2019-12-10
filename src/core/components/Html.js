import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import { HelmetProvider } from 'react-helmet-async';

function Html(props) {
  const { vertical, assets, component, store, client } = props;
  const content = component ? ReactDOM.renderToString(component) : '';
  const helmetContext = {}

  return (
    <HelmetProvider context={helmetContext}>
    <html lang="en">
      <head>
        {/* {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()} */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        <link
          href={assets[vertical.slug].css}
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
        />
      </head>
      <body className="Body">
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(store.getState())};`,
          }}
          charSet="UTF-8"
        />
        {client ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${serialize(
                client.cache.extract()
              )};`,
            }}
            charSet="UTF-8"
          />
        ) : null}
        <script src={assets[vertical.slug].js} charSet="UTF-8" />
      </body>
    </html>
    </HelmetProvider>
  );
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
  client: PropTypes.object,
};

export default Html;
