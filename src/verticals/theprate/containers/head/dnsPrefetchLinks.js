export default [
  'https://dxdh4ztrtes1.cloudfront.net', // The Prate /dist cloudfront
  'https://d39tspj7ekowql.cloudfront.net', // lowdown publisher cloudfront dist
  'https://lowdown-production.herokuapp.com', // lowdown production host
  'https://drafty.imgix.net', // imgix host
  '//www.google-analytics.com',
].map(href => ({ rel: 'dns-prefetch', href }));
