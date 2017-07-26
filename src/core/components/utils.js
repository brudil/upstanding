import qs from 'query-string'

export function imgixURL(resource, params = '') {
  const defaults = {
    usm: 12,
    q: 55,
    fit: 'crop',
    crop: 'entropy',
    auto: 'format',
  };
  const query = qs.stringify({ ...params, ...defaults });
  return `https://drafty.imgix.net/${resource}?${query}`;
}

export function imgixText(params = {}) {
  const query = qs.stringify(params);
  return `https://assets.imgix.net/~text?${query}`;
}
