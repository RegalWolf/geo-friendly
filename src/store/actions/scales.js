import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchScalesStart = () => {
  return {
    type: actionTypes.FETCH_SCALES_START
  };
};

export const fetchScalesSuccess = scales => {
  return {
    type: actionTypes.FETCH_SCALES_SUCCESS,
    scales
  };
};

export const fetchScalesFail = error => {
  return {
    type: actionTypes.FETCH_SCALES_FAIL,
    error
  };
};

export const fetchScales = token => {
  return dispatch => {
    dispatch(fetchScalesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/scales?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchScalesSuccess(response.data.data));
        } else {
          dispatch(fetchScalesFail(response.data.message));
        }
      });
  }
};

export const postScalesStart = () => {
  return {
    type: actionTypes.POST_SCALES_START,
  };
};

export const postScalesSuccess = message => {
  return {
    type: actionTypes.POST_SCALES_SUCCESS,
    message
  };
};

export const postScalesFail = message => {
  return {
    type: actionTypes.POST_SCALES_FAIL,
    message
  };
};

export const postScales = (scale, token) => {
  return async dispatch => {
    dispatch(postScalesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/scales?token=${token}`;
    await axios.post(url, scale)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postScalesSuccess(response.data.message));
          dispatch(fetchScales(token));
        } else {
          dispatch(postScalesFail(response.data.message));
        }
      });
  }
};

export const deleteScalesStart = () => {
  return {
    type: actionTypes.DELETE_SCALES_START
  };
};

export const deleteScalesSuccess = message => {
  return {
    type: actionTypes.DELETE_SCALES_SUCCESS,
    message
  };
};

export const deleteScalesFail = message => {
  return {
    type: actionTypes.DELETE_SCALES_FAIL,
    message
  };
};

export const deleteScales = (id, token) => {
  return async dispatch => {
    dispatch(deleteScalesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/scales/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteScalesSuccess(response.data.message));
          dispatch(fetchScales(token));
        } else {
          dispatch(deleteScalesFail(response.data.message));
        }
      });
  }
};

export const updateScalesStart = () => {
  return {
    type: actionTypes.UPDATE_SCALES_START
  };
};

export const updateScalesSuccess = message => {
  return {
    type: actionTypes.UPDATE_SCALES_SUCCESS,
    message,
  };
};

export const updateScalesFail = message => {
  return {
    type: actionTypes.UPDATE_SCALES_FAIL,
    message
  };
};

export const updateScales = (id, token, scale) => {
  return async dispatch => {
    dispatch(updateScalesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/scales/${id}?token=${token}`;
    await axios.patch(url, scale)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateScalesSuccess(response.data.message));
          dispatch(fetchScales(token));
        } else {
          dispatch(updateScalesFail(response.data.message));
        }
      });
  }
};
