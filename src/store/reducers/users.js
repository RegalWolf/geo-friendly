import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  users: [],
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

const fetchUsersStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    error: null,
    loading: false
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postUsersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postUsersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteUsersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteUsersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateUsersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateUsersFail = (state, action) => {
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
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.POST_USERS_START:
      return postUsersStart(state, action);
    case actionTypes.POST_USERS_SUCCESS:
      return postUsersSuccess(state, action);
    case actionTypes.POST_USERS_FAIL:
      return postUsersFail(state, action);
    case actionTypes.DELETE_USERS_START:
      return deleteUsersStart(state, action);
    case actionTypes.DELETE_USERS_SUCCESS:
      return deleteUsersSuccess(state, action);
    case actionTypes.DELETE_USERS_FAIL:
      return deleteUsersFail(state, action);
    case actionTypes.UPDATE_USERS_START:
      return updateUsersStart(state, action);
    case actionTypes.UPDATE_USERS_SUCCESS:
      return updateUsersSuccess(state, action);
    case actionTypes.UPDATE_USERS_FAIL:
      return updateUsersFail(state, action);
    default:
      return state;
  }
};

export default reducer;