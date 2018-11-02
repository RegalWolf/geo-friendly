import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const errorReset = () => {
  return {
    type: actionTypes.ERROR_RESET
  };
};

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password
    };
    const url = 'https://g3ofriendly.gurisa.com/api/v1/auth/login';
    axios.post(url, authData)
      .then(response => {
        if (response.data.status) {
          localStorage.setItem('token', response.data.data.token.token);
          localStorage.setItem('expiredDate', response.data.data.token.expired_at);
          dispatch(authSuccess(response.data.data.token.token));
          dispatch(checkAuthTimeout(response.data.data.token.expired_at));
        } else {
          dispatch(authFail(response.data.message));
        }
      });
  }
};

export const authCheckState = () => {
  const token = localStorage.getItem('token');
  return dispatch => {
    if (!token) {
      dispatch(logout());
    } else {
      const expiredDate = localStorage.getItem('expiredDate');
      if (expiredDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
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

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};