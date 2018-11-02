import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ages: [],
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

const fetchAgesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchAgesSuccess = (state, action) => {
  return updateObject(state, {
    ages: action.ages,
    error: null,
    loading: false
  });
};

const fetchAgesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postAgesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postAgesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postAgesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteAgesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteAgesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteAgesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateAgesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateAgesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateAgesFail = (state, action) => {
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
    case actionTypes.FETCH_AGES_START:
      return fetchAgesStart(state, action);
    case actionTypes.FETCH_AGES_SUCCESS:
      return fetchAgesSuccess(state, action);
    case actionTypes.FETCH_AGES_FAIL:
      return fetchAgesFail(state, action);
    case actionTypes.POST_AGES_START:
      return postAgesStart(state, action);
    case actionTypes.POST_AGES_SUCCESS:
      return postAgesSuccess(state, action);
    case actionTypes.POST_AGES_FAIL:
      return postAgesFail(state, action);
    case actionTypes.DELETE_AGES_START:
      return deleteAgesStart(state, action);
    case actionTypes.DELETE_AGES_SUCCESS:
      return deleteAgesSuccess(state, action);
    case actionTypes.DELETE_AGES_FAIL:
      return deleteAgesFail(state, action);
    case actionTypes.UPDATE_AGES_START:
      return updateAgesStart(state, action);
    case actionTypes.UPDATE_AGES_SUCCESS:
      return updateAgesSuccess(state, action);
    case actionTypes.UPDATE_AGES_FAIL:
      return updateAgesFail(state, action);
    default:
      return state;
  }
};

export default reducer;