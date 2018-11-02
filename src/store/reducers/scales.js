import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  scales: [],
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

const fetchScalesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchScalesSuccess = (state, action) => {
  return updateObject(state, {
    scales: action.scales,
    error: null,
    loading: false
  });
};

const fetchScalesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postScalesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postScalesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postScalesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteScalesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteScalesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteScalesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateScalesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateScalesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateScalesFail = (state, action) => {
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
    case actionTypes.FETCH_SCALES_START:
      return fetchScalesStart(state, action);
    case actionTypes.FETCH_SCALES_SUCCESS:
      return fetchScalesSuccess(state, action);
    case actionTypes.FETCH_SCALES_FAIL:
      return fetchScalesFail(state, action);
    case actionTypes.POST_SCALES_START:
      return postScalesStart(state, action);
    case actionTypes.POST_SCALES_SUCCESS:
      return postScalesSuccess(state, action);
    case actionTypes.POST_SCALES_FAIL:
      return postScalesFail(state, action);
    case actionTypes.DELETE_SCALES_START:
      return deleteScalesStart(state, action);
    case actionTypes.DELETE_SCALES_SUCCESS:
      return deleteScalesSuccess(state, action);
    case actionTypes.DELETE_SCALES_FAIL:
      return deleteScalesFail(state, action);
    case actionTypes.UPDATE_SCALES_START:
      return updateScalesStart(state, action);
    case actionTypes.UPDATE_SCALES_SUCCESS:
      return updateScalesSuccess(state, action);
    case actionTypes.UPDATE_SCALES_FAIL:
      return updateScalesFail(state, action);
    default:
      return state;
  }
};

export default reducer;