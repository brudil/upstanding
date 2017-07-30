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
import FormFrontPage from './FormFrontPage';
import ToneFrontPage from './ToneFrontPage';
import SectionFrontPage from './SectionFrontPage';
import AuthorFrontPage from './AuthorFrontPage';
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
        <meta property="og:site_name" content="The Drab" />
        <meta property="fb:app_id" content="696155863910264" />
        <meta property="fb:pages" content="1302392339858247" />
      </Helmet>
      <Header />
      <div className="Site__main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/form/:form" component={FormFrontPage} />
          <Route path="/tone/:tone" component={ToneFrontPage} />
          <Route path="/author/:author" component={AuthorFrontPage} />
          <Route path="/:form/**-:contentId" component={ContentPage} exact />
          <Route path="/:section" component={SectionFrontPage} />
          <Route component={NotFoundPage} />
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
