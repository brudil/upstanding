import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function Html(props) {
  const { vertical, assets, component, store } = props;
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        <link
          href={assets.styles[vertical.slug]}
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
        <script src={assets.javascript[vertical.slug]} charSet="UTF-8" />
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};

export default Html;
