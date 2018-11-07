import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  collections: [],
  error: null,
  loading: false,
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
    error: null,
    loading: true
  });
};

const fetchCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    collections: action.collections,
    error: null,
    loading: false
  });
};

const fetchCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteCollectionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
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
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateCollectionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateCollectionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: false,
      message: action.message
    }
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