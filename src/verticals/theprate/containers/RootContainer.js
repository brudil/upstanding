import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      {/* <Helmet
        htmlAttributes={{ lang: 'en' }}
        titleTemplate="%s | The Prate"
        defaultTitle="The Prate"
        script={[]}
        link={[
          { rel: 'stylesheet', href: 'https://use.typekit.net/cob0eos.css' },
          ...brandingLinks,
          ...dnsPrefetchLinks,
        ]}
        meta={[...brandingMeta]}
      /> */}
      <Switch>
        <Route path="/bitch"  component={(props) => (
          <React.Fragment>
            <Helmet
              titleTemplate="%s | Bitch"
              defaultTitle="Bitch"
            >
              <meta property="og:image" content="https://drafty.imgix.net/a9242096-73ef-4771-b56b-f841473e5391" />
              <meta property="og:image:height" content="660" />
              <meta property="og:image:width" content="1200" />
            </Helmet>
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
          </React.Fragment>
        )}/>
        <Route path="/" component={() => (
          <React.Fragment>
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
          </React.Fragment>
        )}/>
      </Switch>
    </div>
  );
}

RootContainer.propTypes = {
  children: PropTypes.node,
};

export default RootContainer;
