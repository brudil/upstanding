import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import BitchHeader from '../components/bitch/Header';
import Footer from '../components/Footer';
import dnsPrefetchLinks from './head/dnsPrefetchLinks';
import brandingLinks from './head/brandingLinks';
import brandingMeta from './head/brandingMeta';
import HomePage from './HomePage';
import DisclaimerPage from './DisclaimerPage';
import ContentPage from './ContentPage';
import PreviewContentPage from './PreviewContentPage';
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
        link={[
          { rel: 'stylesheet', href: 'https://use.typekit.net/cob0eos.css' },
          ...brandingLinks,
          ...dnsPrefetchLinks,
        ]}
        meta={[...brandingMeta]}
      />
      <Switch>
        <Route path="/bitch"  component={(props) => (
          <div>
            <Helmet
              titleTemplate="%s | Bitch"
              defaultTitle="Bitch"
            />
            <BitchHeader />
            <div className="Site__main Site__main--bitch">
              <Switch>
                <Route exact path="/bitch" component={HomePage} />
                <Route
                  path="/bitch/preview/:revisionId/:previewKey"
                  component={PreviewContentPage}
                  exact
                />
                <Route path="/bitch/form/:form" component={FormFrontPage} />
                <Route path="/bitch/tone/:tone" component={ToneFrontPage} />
                <Route path="/bitch/:form/**-:contentId" component={ContentPage} exact />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
            <Footer />
          </div>
        )}/>
        <Route path="/" component={() => (
          <div>
            <Header />
            <div className="Site__main">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/disclaimer" component={DisclaimerPage} />
                <Route path="/form/:form" component={FormFrontPage} />
                <Route path="/tone/:tone" component={ToneFrontPage} />
                <Route path="/author/:author" component={AuthorFrontPage} />
                <Route
                  path="/preview/:revisionId/:previewKey"
                  component={PreviewContentPage}
                  exact
                />
                <Route path="/:form/**-:contentId" component={ContentPage} exact />
                <Route path="/:section" component={SectionFrontPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
            <Footer />
          </div>
        )}/>
      </Switch>
    </div>
  );
}

RootContainer.propTypes = {
  children: PropTypes.node,
};

export default RootContainer;
