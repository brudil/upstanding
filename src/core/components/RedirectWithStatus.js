import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectWithStatus = ({ from, to, status }) =>
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // eslint-disable-next-line
      if (staticContext) staticContext.status = status;
      return <Redirect from={from} to={to} />;
    }}
  />;

export default RedirectWithStatus;
