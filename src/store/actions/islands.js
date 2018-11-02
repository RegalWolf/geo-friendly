import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchIslandsStart = () => {
  return {
    type: actionTypes.FETCH_ISLANDS_START
  };
};

export const fetchIslandsSuccess = islands => {
  return {
    type: actionTypes.FETCH_ISLANDS_SUCCESS,
    islands
  };
};

export const fetchIslandsFail = error => {
  return {
    type: actionTypes.FETCH_ISLANDS_FAIL,
    error
  };
};

export const fetchIslands = token => {
  return dispatch => {
    dispatch(fetchIslandsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/islands?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchIslandsSuccess(response.data.data));
        } else {
          dispatch(fetchIslandsFail(response.data.message));
        }
      });
  }
};

export const postIslandsStart = () => {
  return {
    type: actionTypes.POST_ISLANDS_START,
  };
};

export const postIslandsSuccess = message => {
  return {
    type: actionTypes.POST_ISLANDS_SUCCESS,
    message
  };
};

export const postIslandsFail = message => {
  return {
    type: actionTypes.POST_ISLANDS_FAIL,
    message
  };
};

export const postIslands = (island, token) => {
  return async dispatch => {
    dispatch(postIslandsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/islands?token=${token}`;
    await axios.post(url, island)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postIslandsSuccess(response.data.message));
          dispatch(fetchIslands(token));
        } else {
          dispatch(postIslandsFail(response.data.message));
        }
      });
  }
};

export const deleteIslandsStart = () => {
  return {
    type: actionTypes.DELETE_ISLANDS_START
  };
};

export const deleteIslandsSuccess = message => {
  return {
    type: actionTypes.DELETE_ISLANDS_SUCCESS,
    message
  };
};

export const deleteIslandsFail = message => {
  return {
    type: actionTypes.DELETE_ISLANDS_FAIL,
    message
  };
};

export const deleteIslands = (id, token) => {
  return async dispatch => {
    dispatch(deleteIslandsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/islands/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteIslandsSuccess(response.data.message));
          dispatch(fetchIslands(token));
        } else {
          dispatch(deleteIslandsFail(response.data.message));
        }
      });
  }
};

export const updateIslandsStart = () => {
  return {
    type: actionTypes.UPDATE_ISLANDS_START
  };
};

export const updateIslandsSuccess = message => {
  return {
    type: actionTypes.UPDATE_ISLANDS_SUCCESS,
    message,
  };
};

export const updateIslandsFail = message => {
  return {
    type: actionTypes.UPDATE_ISLANDS_FAIL,
    message
  };
};

export const updateIslands = (id, token, island) => {
  return async dispatch => {
    dispatch(updateIslandsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/islands/${id}?token=${token}`;
    await axios.patch(url, island)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateIslandsSuccess(response.data.message));
          dispatch(fetchIslands(token));
        } else {
          dispatch(updateIslandsFail(response.data.message));
        }
      });
  }
};
