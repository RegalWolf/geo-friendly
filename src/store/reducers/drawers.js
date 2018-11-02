import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  drawers: [],
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

const fetchDrawersStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchDrawersSuccess = (state, action) => {
  return updateObject(state, {
    drawers: action.drawers,
    error: null,
    loading: false
  });
};

const fetchDrawersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postDrawersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postDrawersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postDrawersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteDrawersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteDrawersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteDrawersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateDrawersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateDrawersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateDrawersFail = (state, action) => {
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
    case actionTypes.FETCH_DRAWERS_START:
      return fetchDrawersStart(state, action);
    case actionTypes.FETCH_DRAWERS_SUCCESS:
      return fetchDrawersSuccess(state, action);
    case actionTypes.FETCH_DRAWERS_FAIL:
      return fetchDrawersFail(state, action);
    case actionTypes.POST_DRAWERS_START:
      return postDrawersStart(state, action);
    case actionTypes.POST_DRAWERS_SUCCESS:
      return postDrawersSuccess(state, action);
    case actionTypes.POST_DRAWERS_FAIL:
      return postDrawersFail(state, action);
    case actionTypes.DELETE_DRAWERS_START:
      return deleteDrawersStart(state, action);
    case actionTypes.DELETE_DRAWERS_SUCCESS:
      return deleteDrawersSuccess(state, action);
    case actionTypes.DELETE_DRAWERS_FAIL:
      return deleteDrawersFail(state, action);
    case actionTypes.UPDATE_DRAWERS_START:
      return updateDrawersStart(state, action);
    case actionTypes.UPDATE_DRAWERS_SUCCESS:
      return updateDrawersSuccess(state, action);
    case actionTypes.UPDATE_DRAWERS_FAIL:
      return updateDrawersFail(state, action);
    default:
      return state;
  }
};

export default reducer;