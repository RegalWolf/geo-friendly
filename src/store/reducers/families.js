import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  families: [],
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

const fetchFamiliesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchFamiliesSuccess = (state, action) => {
  return updateObject(state, {
    families: action.families,
    error: null,
    loading: false
  });
};

const fetchFamiliesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postFamiliesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postFamiliesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postFamiliesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteFamiliesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteFamiliesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteFamiliesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateFamiliesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateFamiliesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateFamiliesFail = (state, action) => {
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
    case actionTypes.FETCH_FAMILIES_START:
      return fetchFamiliesStart(state, action);
    case actionTypes.FETCH_FAMILIES_SUCCESS:
      return fetchFamiliesSuccess(state, action);
    case actionTypes.FETCH_FAMILIES_FAIL:
      return fetchFamiliesFail(state, action);
    case actionTypes.POST_FAMILIES_START:
      return postFamiliesStart(state, action);
    case actionTypes.POST_FAMILIES_SUCCESS:
      return postFamiliesSuccess(state, action);
    case actionTypes.POST_FAMILIES_FAIL:
      return postFamiliesFail(state, action);
    case actionTypes.DELETE_FAMILIES_START:
      return deleteFamiliesStart(state, action);
    case actionTypes.DELETE_FAMILIES_SUCCESS:
      return deleteFamiliesSuccess(state, action);
    case actionTypes.DELETE_FAMILIES_FAIL:
      return deleteFamiliesFail(state, action);
    case actionTypes.UPDATE_FAMILIES_START:
      return updateFamiliesStart(state, action);
    case actionTypes.UPDATE_FAMILIES_SUCCESS:
      return updateFamiliesSuccess(state, action);
    case actionTypes.UPDATE_FAMILIES_FAIL:
      return updateFamiliesFail(state, action);
    default:
      return state;
  }
};

export default reducer;