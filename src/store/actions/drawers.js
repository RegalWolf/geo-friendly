import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchDrawersStart = () => {
  return {
    type: actionTypes.FETCH_DRAWERS_START
  };
};

export const fetchDrawersSuccess = drawers => {
  return {
    type: actionTypes.FETCH_DRAWERS_SUCCESS,
    drawers
  };
};

export const fetchDrawersFail = error => {
  return {
    type: actionTypes.FETCH_DRAWERS_FAIL,
    error
  };
};

export const fetchDrawers = token => {
  return dispatch => {
    dispatch(fetchDrawersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/drawers?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchDrawersSuccess(response.data.data));
        } else {
          dispatch(fetchDrawersFail(response.data.message));
        }
      });
  }
};

export const postDrawersStart = () => {
  return {
    type: actionTypes.POST_DRAWERS_START,
  };
};

export const postDrawersSuccess = message => {
  return {
    type: actionTypes.POST_DRAWERS_SUCCESS,
    message
  };
};

export const postDrawersFail = message => {
  return {
    type: actionTypes.POST_DRAWERS_FAIL,
    message
  };
};

export const postDrawers = (drawer, token) => {
  return async dispatch => {
    dispatch(postDrawersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/drawers?token=${token}`;
    await axios.post(url, drawer)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postDrawersSuccess(response.data.message));
          dispatch(fetchDrawers(token));
        } else {
          dispatch(postDrawersFail(response.data.message));
        }
      });
  }
};

export const deleteDrawersStart = () => {
  return {
    type: actionTypes.DELETE_DRAWERS_START
  };
};

export const deleteDrawersSuccess = message => {
  return {
    type: actionTypes.DELETE_DRAWERS_SUCCESS,
    message
  };
};

export const deleteDrawersFail = message => {
  return {
    type: actionTypes.DELETE_DRAWERS_FAIL,
    message
  };
};

export const deleteDrawers = (id, token) => {
  return async dispatch => {
    dispatch(deleteDrawersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/drawers/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteDrawersSuccess(response.data.message));
          dispatch(fetchDrawers(token));
        } else {
          dispatch(deleteDrawersFail(response.data.message));
        }
      });
  }
};

export const updateDrawersStart = () => {
  return {
    type: actionTypes.UPDATE_DRAWERS_START
  };
};

export const updateDrawersSuccess = message => {
  return {
    type: actionTypes.UPDATE_DRAWERS_SUCCESS,
    message,
  };
};

export const updateDrawersFail = message => {
  return {
    type: actionTypes.UPDATE_DRAWERS_FAIL,
    message
  };
};

export const updateDrawers = (id, token, drawer) => {
  return async dispatch => {
    dispatch(updateDrawersStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/drawers/${id}?token=${token}`;
    await axios.patch(url, drawer)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateDrawersSuccess(response.data.message));
          dispatch(fetchDrawers(token));
        } else {
          dispatch(updateDrawersFail(response.data.message));
        }
      });
  };
};
