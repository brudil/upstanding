export function createQueryString(obj) {
  return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}
