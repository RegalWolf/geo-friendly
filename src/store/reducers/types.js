import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  types: [],
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

const fetchTypesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchTypesSuccess = (state, action) => {
  return updateObject(state, {
    types: action.types,
    error: null,
    loading: false
  });
};

const fetchTypesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postTypesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postTypesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postTypesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteTypesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteTypesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteTypesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateTypesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateTypesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateTypesFail = (state, action) => {
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
    case actionTypes.FETCH_TYPES_START:
      return fetchTypesStart(state, action);
    case actionTypes.FETCH_TYPES_SUCCESS:
      return fetchTypesSuccess(state, action);
    case actionTypes.FETCH_TYPES_FAIL:
      return fetchTypesFail(state, action);
    case actionTypes.POST_TYPES_START:
      return postTypesStart(state, action);
    case actionTypes.POST_TYPES_SUCCESS:
      return postTypesSuccess(state, action);
    case actionTypes.POST_TYPES_FAIL:
      return postTypesFail(state, action);
    case actionTypes.DELETE_TYPES_START:
      return deleteTypesStart(state, action);
    case actionTypes.DELETE_TYPES_SUCCESS:
      return deleteTypesSuccess(state, action);
    case actionTypes.DELETE_TYPES_FAIL:
      return deleteTypesFail(state, action);
    case actionTypes.UPDATE_TYPES_START:
      return updateTypesStart(state, action);
    case actionTypes.UPDATE_TYPES_SUCCESS:
      return updateTypesSuccess(state, action);
    case actionTypes.UPDATE_TYPES_FAIL:
      return updateTypesFail(state, action);
    default:
      return state;
  }
};

export default reducer;