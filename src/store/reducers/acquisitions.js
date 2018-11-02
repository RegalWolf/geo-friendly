import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  acquisitions: [],
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

const fetchAcquisitionsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchAcquisitionsSuccess = (state, action) => {
  return updateObject(state, {
    acquisitions: action.acquisitions,
    error: null,
    loading: false
  });
};

const fetchAcquisitionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postAcquisitionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postAcquisitionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postAcquisitionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteAcquisitionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteAcquisitionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteAcquisitionsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateAcquisitionsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateAcquisitionsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateAcquisitionsFail = (state, action) => {
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
    case actionTypes.FETCH_ACQUISITIONS_START:
      return fetchAcquisitionsStart(state, action);
    case actionTypes.FETCH_ACQUISITIONS_SUCCESS:
      return fetchAcquisitionsSuccess(state, action);
    case actionTypes.FETCH_ACQUISITIONS_FAIL:
      return fetchAcquisitionsFail(state, action);
    case actionTypes.POST_ACQUISITIONS_START:
      return postAcquisitionsStart(state, action);
    case actionTypes.POST_ACQUISITIONS_SUCCESS:
      return postAcquisitionsSuccess(state, action);
    case actionTypes.POST_ACQUISITIONS_FAIL:
      return postAcquisitionsFail(state, action);
    case actionTypes.DELETE_ACQUISITIONS_START:
      return deleteAcquisitionsStart(state, action);
    case actionTypes.DELETE_ACQUISITIONS_SUCCESS:
      return deleteAcquisitionsSuccess(state, action);
    case actionTypes.DELETE_ACQUISITIONS_FAIL:
      return deleteAcquisitionsFail(state, action);
    case actionTypes.UPDATE_ACQUISITIONS_START:
      return updateAcquisitionsStart(state, action);
    case actionTypes.UPDATE_ACQUISITIONS_SUCCESS:
      return updateAcquisitionsSuccess(state, action);
    case actionTypes.UPDATE_ACQUISITIONS_FAIL:
      return updateAcquisitionsFail(state, action);
    default:
      return state;
  }
};

export default reducer;