export default [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    // eslint-disable-next-line global-require
    href: require('../../images/favicons/apple-touch-icon.png'),
  },
  {
    rel: 'icon',
    type: 'image/png',
    // eslint-disable-next-line global-require
    href: require('../../images/favicons/favicon-32x32.png'),
    sizes: '32x32',
  },
  {
    rel: 'icon',
    type: 'image/png',
    // eslint-disable-next-line global-require
    href: require('../../images/favicons/favicon-16x16.png'),
    sizes: '16x16',
  },
  {
    rel: 'mask-icon',
    // eslint-disable-next-line global-require
    href: require('../../images/favicons/safari-pinned-tab.svg'),
    color: '#5bbad5',
  },
  {
    rel: 'shortcut icon',
    // eslint-disable-next-line global-require
    href: require('../../images/favicons/favicon.ico'),
  },
  {
    href: 'https://fonts.googleapis.com/css?family=Lato|Source+Sans+Pro',
    rel: 'stylesheet',
  },
];
