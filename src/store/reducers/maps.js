import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  maps: [],
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

const fetchMapsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchMapsSuccess = (state, action) => {
  return updateObject(state, {
    maps: action.maps,
    error: null,
    loading: false
  });
};

const fetchMapsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postMapsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postMapsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postMapsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteMapsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteMapsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteMapsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateMapsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateMapsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateMapsFail = (state, action) => {
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
    case actionTypes.FETCH_MAPS_START:
      return fetchMapsStart(state, action);
    case actionTypes.FETCH_MAPS_SUCCESS:
      return fetchMapsSuccess(state, action);
    case actionTypes.FETCH_MAPS_FAIL:
      return fetchMapsFail(state, action);
    case actionTypes.POST_MAPS_START:
      return postMapsStart(state, action);
    case actionTypes.POST_MAPS_SUCCESS:
      return postMapsSuccess(state, action);
    case actionTypes.POST_MAPS_FAIL:
      return postMapsFail(state, action);
    case actionTypes.DELETE_MAPS_START:
      return deleteMapsStart(state, action);
    case actionTypes.DELETE_MAPS_SUCCESS:
      return deleteMapsSuccess(state, action);
    case actionTypes.DELETE_MAPS_FAIL:
      return deleteMapsFail(state, action);
    case actionTypes.UPDATE_MAPS_START:
      return updateMapsStart(state, action);
    case actionTypes.UPDATE_MAPS_SUCCESS:
      return updateMapsSuccess(state, action);
    case actionTypes.UPDATE_MAPS_FAIL:
      return updateMapsFail(state, action);
    default:
      return state;
  }
};

export default reducer;