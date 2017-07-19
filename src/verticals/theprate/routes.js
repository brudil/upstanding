import React from 'react';
import { Route } from 'react-router';
import RootContainer from './containers/RootContainer';
import HomePage from './containers/HomePage';
import ContentPage from './containers/ContentPage';
import NotFoundPage from './containers/NotFoundPage';

export default (
  <Route component={RootContainer}>
    <Route path="/" component={HomePage} />
    <Route path="/section/:section" component={HomePage} />
    <Route path="/:form/:slug-:contentId" component={ContentPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
