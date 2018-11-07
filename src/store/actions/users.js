import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error
  };
};

export const fetchUsers = token => {
  return dispatch => {
    dispatch(fetchUsersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/users?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchUsersSuccess(response.data.data));
        } else {
          dispatch(fetchUsersFail(response.data.message));
        }
      });
  }
};

export const postUsersStart = () => {
  return {
    type: actionTypes.POST_USERS_START,
  };
};

export const postUsersSuccess = message => {
  return {
    type: actionTypes.POST_USERS_SUCCESS,
    message
  };
};

export const postUsersFail = message => {
  return {
    type: actionTypes.POST_USERS_FAIL,
    message
  };
};

export const postUsers = (user, token) => {
  return async dispatch => {
    dispatch(postUsersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/users?token=${token}`;
    await axios.post(url, user)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postUsersSuccess(response.data.message));
          dispatch(fetchUsers(token));
        } else {
          dispatch(postUsersFail(response.data.message));
        }
      });
  }
};

export const deleteUsersStart = () => {
  return {
    type: actionTypes.DELETE_USERS_START
  };
};

export const deleteUsersSuccess = message => {
  return {
    type: actionTypes.DELETE_USERS_SUCCESS,
    message
  };
};

export const deleteUsersFail = message => {
  return {
    type: actionTypes.DELETE_USERS_FAIL,
    message
  };
};

export const deleteUsers = (id, token) => {
  return async dispatch => {
    dispatch(deleteUsersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/users/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteUsersSuccess(response.data.message));
          dispatch(fetchUsers(token));
        } else {
          dispatch(deleteUsersFail(response.data.message));
        }
      });
  }
};

export const updateUsersStart = () => {
  return {
    type: actionTypes.UPDATE_USERS_START
  };
};

export const updateUsersSuccess = message => {
  return {
    type: actionTypes.UPDATE_USERS_SUCCESS,
    message,
  };
};

export const updateUsersFail = message => {
  return {
    type: actionTypes.UPDATE_USERS_FAIL,
    message
  };
};

export const updateUsers = (id, token, user) => {
  return async dispatch => {
    dispatch(updateUsersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/users/${id}?token=${token}`;
    await axios.patch(url, user)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateUsersSuccess(response.data.message));
          dispatch(fetchUsers(token));
        } else {
          dispatch(updateUsersFail(response.data.message));
        }
      });
  };
};
