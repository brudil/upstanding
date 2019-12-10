import RootContainer from './containers/RootContainer';
import NotFoundPage from './containers/NotFoundPage';
import openGraphImageHandler from './views/openGraphImage';

export default {
  name: 'The Prate',
  slug: 'theprate',
  lowdown: {
    id: 'thedrab',
  },
  Application: RootContainer,
  tracking: {
    sentry: 'https://a43146803f4a4810b7aa7f779c5e2de6@app.getsentry.com/89808',
    ga: 'UA-81648266-2',
  },
  external: openGraphImageHandler,
  pages: {
    notFound: NotFoundPage,
  },
  server: {
    ssl: {
      force: true,
    },
    hosts: [
      'theprate.com',
      'www.theprate.com',
    ],
  },
};
