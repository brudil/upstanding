import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dnsPrefetchLinks from './head/dnsPrefetchLinks';
import brandingLinks from './head/brandingLinks';
import brandingMeta from './head/brandingMeta';

function RootContainer(props) {
  return (
    <div className="Site">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate="%s | The Prate"
        defaultTitle="The Prate"
        script={[
          {
            src: 'https://use.typekit.net/btq5ftm.js',
          },
          {
            innerHTML: 'try{Typekit.load({ async: true })}catch(e){}',
          },
        ]}
        link={[...brandingLinks, ...dnsPrefetchLinks]}
        meta={[...brandingMeta]}
      />
      <Header />
      <div className="Site__main">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

RootContainer.propTypes = {
  children: PropTypes.node,
};

export default RootContainer;
