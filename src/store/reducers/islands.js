import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  islands: [],
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

const fetchIslandsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchIslandsSuccess = (state, action) => {
  return updateObject(state, {
    islands: action.islands,
    error: null,
    loading: false
  });
};

const fetchIslandsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postIslandsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postIslandsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postIslandsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteIslandsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteIslandsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteIslandsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateIslandsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateIslandsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateIslandsFail = (state, action) => {
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
    case actionTypes.FETCH_ISLANDS_START:
      return fetchIslandsStart(state, action);
    case actionTypes.FETCH_ISLANDS_SUCCESS:
      return fetchIslandsSuccess(state, action);
    case actionTypes.FETCH_ISLANDS_FAIL:
      return fetchIslandsFail(state, action);
    case actionTypes.POST_ISLANDS_START:
      return postIslandsStart(state, action);
    case actionTypes.POST_ISLANDS_SUCCESS:
      return postIslandsSuccess(state, action);
    case actionTypes.POST_ISLANDS_FAIL:
      return postIslandsFail(state, action);
    case actionTypes.DELETE_ISLANDS_START:
      return deleteIslandsStart(state, action);
    case actionTypes.DELETE_ISLANDS_SUCCESS:
      return deleteIslandsSuccess(state, action);
    case actionTypes.DELETE_ISLANDS_FAIL:
      return deleteIslandsFail(state, action);
    case actionTypes.UPDATE_ISLANDS_START:
      return updateIslandsStart(state, action);
    case actionTypes.UPDATE_ISLANDS_SUCCESS:
      return updateIslandsSuccess(state, action);
    case actionTypes.UPDATE_ISLANDS_FAIL:
      return updateIslandsFail(state, action);
    default:
      return state;
  }
};

export default reducer;