import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  classifications: [],
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

const fetchClassificationsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchClassificationsSuccess = (state, action) => {
  return updateObject(state, {
    classifications: action.classifications,
    error: null,
    loading: false
  });
};

const fetchClassificationsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postClassificationsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postClassificationsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postClassificationsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteClassificationsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteClassificationsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteClassificationsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateClassificationsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateClassificationsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateClassificationsFail = (state, action) => {
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
    case actionTypes.FETCH_CLASSIFICATIONS_START:
      return fetchClassificationsStart(state, action);
    case actionTypes.FETCH_CLASSIFICATIONS_SUCCESS:
      return fetchClassificationsSuccess(state, action);
    case actionTypes.FETCH_CLASSIFICATIONS_FAIL:
      return fetchClassificationsFail(state, action);
    case actionTypes.POST_CLASSIFICATIONS_START:
      return postClassificationsStart(state, action);
    case actionTypes.POST_CLASSIFICATIONS_SUCCESS:
      return postClassificationsSuccess(state, action);
    case actionTypes.POST_CLASSIFICATIONS_FAIL:
      return postClassificationsFail(state, action);
    case actionTypes.DELETE_CLASSIFICATIONS_START:
      return deleteClassificationsStart(state, action);
    case actionTypes.DELETE_CLASSIFICATIONS_SUCCESS:
      return deleteClassificationsSuccess(state, action);
    case actionTypes.DELETE_CLASSIFICATIONS_FAIL:
      return deleteClassificationsFail(state, action);
    case actionTypes.UPDATE_CLASSIFICATIONS_START:
      return updateClassificationsStart(state, action);
    case actionTypes.UPDATE_CLASSIFICATIONS_SUCCESS:
      return updateClassificationsSuccess(state, action);
    case actionTypes.UPDATE_CLASSIFICATIONS_FAIL:
      return updateClassificationsFail(state, action);
    default:
      return state;
  }
};

export default reducer;