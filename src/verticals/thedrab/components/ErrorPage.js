import React from 'react';
import ER from '../../../core/components/ErrorPage';

const textMap = {
  404: {
    title: 'You win some, you lose some',
    detail: "But this one is definitely lost because This page can't be found.",
  },
  500: {
    title: 'Not even a 2:2',
    detail:
      'A fatal error occurred. We would punish who is responsible, but as mentioned, it was fatal.',
  },
  999: {
    title: "Like a fresher, this isn't working right now",
    detail: 'An error occurred while making this page for you.',
  },
};

const ErrorPage = props => <ER {...props} textMap={textMap} />;

export default ErrorPage;
