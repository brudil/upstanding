import { createQueryString } from '../utils';

// eslint-disable-next-line
export function imgixURL(resource, params = '') {
  const defaults = {
    usm: 12,
    q: 55,
    fit: 'crop',
    crop: 'entropy',
    auto: 'format',
  };
  const qs = createQueryString({ ...params, ...defaults });
  return `https://drafty.imgix.net/${resource}?${qs}`;
}
