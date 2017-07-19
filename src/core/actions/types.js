const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const SET_CONTENT = 'SET_CONTENT';
export const LOAD_CONTENT = createRequestTypes('LOAD_CONTENT');
export const LOAD_CONTENT_LIST = createRequestTypes('LOAD_CONTENT_LIST');
