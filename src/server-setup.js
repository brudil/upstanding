import server from './server';
import theprateConfig from './verticals/theprate/config';

/* grab port from env (heroku/prod) or default (dev) */
const port = process.env.PORT || 3000;

server({
  verticals: [theprateConfig],
  port,
});
