import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dnsPrefetchLinks from './head/dnsPrefetchLinks';
import brandingLinks from './head/brandingLinks';
import brandingMeta from './head/brandingMeta';
import HomePage from './HomePage';
import ContentPage from './ContentPage';
import NotFoundPage from './NotFoundPage';

function RootContainer() {
  return (
    <div className="Site">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate="%s | The Drab"
        defaultTitle="The Drab"
        script={[]}
        link={[...brandingLinks, ...dnsPrefetchLinks]}
        meta={[...brandingMeta]}
      >
        <script src="https://use.typekit.net/cob0eos.js" />
        <script>{`try{Typekit.load({ async: true });}catch(e){}`}</script>
      </Helmet>
      <Header />
      <div className="Site__main">
        <Switch>
          <Route path="/section/:section" component={HomePage} />
          <Route path="/:form/**-:contentId" component={ContentPage} exact />
          <Route path="/" component={HomePage} extact />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

RootContainer.propTypes = {
  children: React.PropTypes.node,
};

export default RootContainer;
