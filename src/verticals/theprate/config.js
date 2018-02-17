import routes from './routes';
import NotFoundPage from './containers/NotFoundPage';

export default {
  name: 'The Prate',
  slug: 'theprate',
  lowdown: {
    id: 'theprate',
  },
  routes,
  tracking: {
    sentry: 'https://a43146803f4a4810b7aa7f779c5e2de6@app.getsentry.com/89808',
    ga: 'UA-81648266-1',
  },
  pages: {
    notFound: NotFoundPage,
  },
  server: {
    ssl: {
      force: true,
    },
    hosts: ['theprate.com', 'www.theprate.com', 'theprate.local'],
  },
  verify: {
    'QbO04F87nw-2xvf25cdfL2BJVEDWxglDeyiofwsh9IQ':
      'QbO04F87nw-2xvf25cdfL2BJVEDWxglDeyiofwsh9IQ.RespT-jJ8qkJkdGqFV8QJJZx8tOiAcHpXZaAzBfltWI',
    'i6-qMEMIpFNlL6MF8poTLY3OCa5Wz85t4cIbPobriXU':
      'i6-qMEMIpFNlL6MF8poTLY3OCa5Wz85t4cIbPobriXU.RespT-jJ8qkJkdGqFV8QJJZx8tOiAcHpXZaAzBfltWI',
    NlawinkYQuWQyxZ7hlf64tt7h0cpvx3kIe4nNNcjlAU:
      'NlawinkYQuWQyxZ7hlf64tt7h0cpvx3kIe4nNNcjlAU.RespT-jJ8qkJkdGqFV8QJJZx8tOiAcHpXZaAzBfltWI',
    zJRx6kbx2JMzio8acJfQZlZHc_YU9zTPM2RbDq7Vq5Q:
      'zJRx6kbx2JMzio8acJfQZlZHc_YU9zTPM2RbDq7Vq5Q.RespT-jJ8qkJkdGqFV8QJJZx8tOiAcHpXZaAzBfltWI',
    FYwmXWoXhDn1zlwEAF5ussGeKEjWo9LS97EZpxI0e_Y:
      'FYwmXWoXhDn1zlwEAF5ussGeKEjWo9LS97EZpxI0e_Y.RespT-jJ8qkJkdGqFV8QJJZx8tOiAcHpXZaAzBfltWI',
  },
};
