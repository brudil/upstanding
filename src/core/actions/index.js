import {
  SET_CONTENT,
  LOAD_CONTENT_LIST,
  LOAD_CONTENT,
  SET_FRONT,
  LOAD_FRONT,
} from './types';

function action(type, payload) {
  return { type, ...payload };
}

export const loadContentList = () => action(LOAD_CONTENT_LIST.REQUEST);
export const loadContentListSuccess = payload =>
  action(LOAD_CONTENT_LIST.SUCCESS, payload);

export const setContent = contentId => action(SET_CONTENT, { contentId });
export const loadContent = contentId =>
  action(LOAD_CONTENT.REQUEST, { contentId });
export const loadContentSuccess = (contentId, payload) =>
  action(LOAD_CONTENT.SUCCESS, { contentId, payload });
export const loadContentFailure = (contentId, error) =>
  action(LOAD_CONTENT.FAILURE, { contentId, error });

// fronts
