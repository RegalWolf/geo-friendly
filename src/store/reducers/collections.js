import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  collections: [],
  loading: false,
  errors: {},
  successMessage: '',
  add: {
    status: false,
    message: null
  },
  delete: {
    status: false,
    message: null
  },
  update: {
    status: false,
    message: null
  }
};

const fetchCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    collections: action.collections,
    errors: {},
    loading: false
  });
};

const fetchCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errors: action.errors
  });
};

const postCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const postCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    errors: {},
    successMessage: action.message,
    collections: [
      ...state.collections,
      action.collection
    ]
  });
};

const postCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errors: action.errors
  });
};

const deleteCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const deleteCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    successMessage: action.message
  });
};

const deleteCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const updateCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    errors: {},
    collections: [
      action.collection
    ],
    successMessage: action.message
  });
};

const updateCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    errors: action.errors
  });
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COLLECTIONS_START:
      return fetchCollectionsStart(state, action);
    case actionTypes.FETCH_COLLECTIONS_SUCCESS:
      return fetchCollectionsSuccess(state, action);
    case actionTypes.FETCH_COLLECTIONS_FAIL:
      return fetchCollectionsFail(state, action);
    case actionTypes.POST_COLLECTIONS_START:
      return postCollectionsStart(state, action);
    case actionTypes.POST_COLLECTIONS_SUCCESS:
      return postCollectionsSuccess(state, action);
    case actionTypes.POST_COLLECTIONS_FAIL:
      return postCollectionsFail(state, action);
    case actionTypes.DELETE_COLLECTIONS_START:
      return deleteCollectionsStart(state, action);
    case actionTypes.DELETE_COLLECTIONS_SUCCESS:
      return deleteCollectionsSuccess(state, action);
    case actionTypes.DELETE_COLLECTIONS_FAIL:
      return deleteCollectionsFail(state, action);
    case actionTypes.UPDATE_COLLECTIONS_START:
      return updateCollectionsStart(state, action);
    case actionTypes.UPDATE_COLLECTIONS_SUCCESS:
      return updateCollectionsSuccess(state, action);
    case actionTypes.UPDATE_COLLECTIONS_FAIL:
      return updateCollectionsFail(state, action);
    default:
      return state;
  }
};

export default reducer;