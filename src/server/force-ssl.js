export default function(req, res, next) {
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }

  if (process.env.NODE_ENV === 'production' && req.subdomains[0] === 'www') {
    return res.redirect(`https://${req.hostname.slice(4)}${req.url}`);
  }

  return next();
}
