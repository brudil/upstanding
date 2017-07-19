import { takeLatest, call, put, select } from 'redux-saga/effects';
import getVertical from '../sagas/getVertical';
import api from '../api';

// TYPES
const SET_FRONT = 'SET_FRONT';

const LOAD_FRONT_REQUEST = 'LOAD_FRONT_REQUEST';
const LOAD_FRONT_FAILURE = 'LOAD_FRONT_FAILURE';
const LOAD_FRONT_SUCCESS = 'LOAD_FRONT_SUCCESS';

// ACTIONS
export const setFront = key => ({ type: SET_FRONT, payload: { key } });
export const loadFront = key => ({
  type: LOAD_FRONT_REQUEST,
  payload: { key },
});

// HELPERS
const loadFrontSuccess = (key, payload) => ({
  type: LOAD_FRONT_SUCCESS,
  payload: { key, payload },
});
const loadFrontFailure = (key, error) => ({
  type: LOAD_FRONT_FAILURE,
  payload: { key, error },
});

// REDUCER
const initialState = {
  map: {},
};

export default function FrontsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FRONT_REQUEST: {
      return {
        ...state,
        map: {
          ...state.map,
          [action.payload.key]: {
            isLoading: true,
            isLoaded: false,
            data: [],
          },
        },
      };
    }
    case LOAD_FRONT_SUCCESS: {
      return {
        ...state,
        map: {
          ...state.map,
          [action.payload.key]: {
            isLoading: false,
            isLoaded: true,
            data: action.payload.payload.data.results,
          },
        },
      };
    }
    case LOAD_FRONT_FAILURE: {
      return {
        ...state,
        map: {
          ...state.map,
          [action.payload.key]: {
            isLoading: false,
            isLoaded: false,
            error: action.payload.error,
          },
        },
      };
    }
    default:
      return state;
  }
}

// SAGA
function* handleLoadFront({ payload: { key } }) {
  try {
    const vertical = yield getVertical();
    const content = yield call(api.getFrontByKey, vertical, key);
    yield put(loadFrontSuccess(key, content));
  } catch (error) {
    yield put(loadFrontFailure(key, error));
  }
}

function* handleSetFront(action) {
  const key = action.payload.key;
  const hasContentCached = yield select(state =>
    state.fronts.map.hasOwnProperty(key)
  );

  if (!hasContentCached) {
    yield put(loadFront(key));
  }
}

export function* saga() {
  yield takeLatest(LOAD_FRONT_REQUEST, handleLoadFront);
  yield takeLatest(SET_FRONT, handleSetFront);
}
