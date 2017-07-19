import server from './server';
import thedrabConfig from './verticals/thedrab/config';

/* grab port from env (heroku/prod) or default (dev) */
const port = process.env.PORT || 3000;

server({
  verticals: [thedrabConfig],
  port,
});
