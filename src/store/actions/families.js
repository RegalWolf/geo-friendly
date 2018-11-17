import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchFamiliesStart = () => {
  return {
    type: actionTypes.FETCH_FAMILIES_START
  };
};

export const fetchFamiliesSuccess = families => {
  return {
    type: actionTypes.FETCH_FAMILIES_SUCCESS,
    families
  };
};

export const fetchFamiliesFail = error => {
  return {
    type: actionTypes.FETCH_FAMILIES_FAIL,
    error
  };
};

export const fetchFamilies = token => {
  return async dispatch => {
    dispatch(fetchFamiliesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/families?token=${token}`;
    await axios.get(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(fetchFamiliesSuccess(response.data.data));
        } else {
          await dispatch(fetchFamiliesFail(response.data.message));
        }
      });
  }
};

export const postFamiliesStart = () => {
  return {
    type: actionTypes.POST_FAMILIES_START,
  };
};

export const postFamiliesSuccess = message => {
  return {
    type: actionTypes.POST_FAMILIES_SUCCESS,
    message
  };
};

export const postFamiliesFail = message => {
  return {
    type: actionTypes.POST_FAMILIES_FAIL,
    message
  };
};

export const postFamilies = (family, token) => {
  return async dispatch => {
    dispatch(postFamiliesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/families?token=${token}`;
    await axios.post(url, family)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postFamiliesSuccess(response.data.message));
          dispatch(fetchFamilies(token));
        } else {
          dispatch(postFamiliesFail(response.data.message));
        }
      });
  }
};

export const deleteFamiliesStart = () => {
  return {
    type: actionTypes.DELETE_FAMILIES_START
  };
};

export const deleteFamiliesSuccess = message => {
  return {
    type: actionTypes.DELETE_FAMILIES_SUCCESS,
    message
  };
};

export const deleteFamiliesFail = message => {
  return {
    type: actionTypes.DELETE_FAMILIES_FAIL,
    message
  };
};

export const deleteFamilies = (id, token) => {
  return async dispatch => {
    dispatch(deleteFamiliesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/families/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteFamiliesSuccess(response.data.message));
          dispatch(fetchFamilies(token));
        } else {
          dispatch(deleteFamiliesFail(response.data.message));
        }
      });
  }
};

export const updateFamiliesStart = () => {
  return {
    type: actionTypes.UPDATE_FAMILIES_START
  };
};

export const updateFamiliesSuccess = message => {
  return {
    type: actionTypes.UPDATE_FAMILIES_SUCCESS,
    message,
  };
};

export const updateFamiliesFail = message => {
  return {
    type: actionTypes.UPDATE_FAMILIES_FAIL,
    message
  };
};

export const updateFamilies = (id, token, family) => {
  return async dispatch => {
    dispatch(updateFamiliesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/families/${id}?token=${token}`;
    await axios.patch(url, family)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateFamiliesSuccess(response.data.message));
          dispatch(fetchFamilies(token));
        } else {
          dispatch(updateFamiliesFail(response.data.message));
        }
      });
  };
};
