import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user_id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user_id,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username,
      password
    };
    const url = 'https://g3ofriendly.gurisa.com/api/v1/auth/login';
    axios.post(url, authData)
      .then(response => {
        if (response.data.status) {
          localStorage.setItem('token', response.data.data.token.token);
          localStorage.setItem('user_id', response.data.data.user.id);
          localStorage.setItem('expiredDate', response.data.data.token.expired_at);
          dispatch(authSuccess(response.data.data.token.token, response.data.data.user.id));
          dispatch(checkAuthTimeout(response.data.data.token.expired_at));
        } else {
          dispatch(authFail(response.data.message));
        }
      });
  }
};

export const authCheckState = () => {
  const token = localStorage.getItem('token');
  const expiredDate = localStorage.getItem('expiredDate');
  const user_id = localStorage.getItem('user_id');

  return dispatch => {
    if ((!token) || (!expiredDate) || (!user_id)) {
      dispatch(logout());
    } else {
      if (expiredDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, user_id));
        dispatch(checkAuthTimeout(expiredDate));
      }
    }
  };
};

export const checkAuthTimeout = expiredDate => {
  const expiredTime = new Date(expiredDate) - new Date();

  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiredTime)
  }
}

export const logout = () => {
  // remove local storage
  localStorage.removeItem('token');
  localStorage.removeItem('expiredDate');
  localStorage.removeItem('user_id');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};