import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchClassificationsStart = () => {
  return {
    type: actionTypes.FETCH_CLASSIFICATIONS_START
  };
};

export const fetchClassificationsSuccess = classifications => {
  return {
    type: actionTypes.FETCH_CLASSIFICATIONS_SUCCESS,
    classifications
  };
};

export const fetchClassificationsFail = error => {
  return {
    type: actionTypes.FETCH_CLASSIFICATIONS_FAIL,
    error
  };
};

export const fetchClassifications = token => {
  return dispatch => {
    dispatch(fetchClassificationsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/classifications?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchClassificationsSuccess(response.data.data));
        } else {
          dispatch(fetchClassificationsFail(response.data.message));
        }
      });
  }
};

export const postClassificationsStart = () => {
  return {
    type: actionTypes.POST_CLASSIFICATIONS_START,
  };
};

export const postClassificationsSuccess = message => {
  return {
    type: actionTypes.POST_CLASSIFICATIONS_SUCCESS,
    message
  };
};

export const postClassificationsFail = message => {
  return {
    type: actionTypes.POST_CLASSIFICATIONS_FAIL,
    message
  };
};

export const postClassifications = (classification, token) => {
  return async dispatch => {
    dispatch(postClassificationsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/classifications?token=${token}`;
    await axios.post(url, classification)
      .then(async response => {
        console.log(response);
        if (response.data.status) {
          await dispatch(postClassificationsSuccess(response.data.message));
          dispatch(fetchClassifications(token));
        } else {
          dispatch(postClassificationsFail(response.data.message));
        }
      });
  }
};

export const deleteClassificationsStart = () => {
  return {
    type: actionTypes.DELETE_CLASSIFICATIONS_START
  };
};

export const deleteClassificationsSuccess = message => {
  return {
    type: actionTypes.DELETE_CLASSIFICATIONS_SUCCESS,
    message
  };
};

export const deleteClassificationsFail = message => {
  return {
    type: actionTypes.DELETE_CLASSIFICATIONS_FAIL,
    message
  };
};

export const deleteClassifications = (id, token) => {
  return async dispatch => {
    dispatch(deleteClassificationsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/classifications/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteClassificationsSuccess(response.data.message));
          dispatch(fetchClassifications(token));
        } else {
          dispatch(deleteClassificationsFail(response.data.message));
        }
      });
  }
};

export const updateClassificationsStart = () => {
  return {
    type: actionTypes.UPDATE_CLASSIFICATIONS_START
  };
};

export const updateClassificationsSuccess = message => {
  return {
    type: actionTypes.UPDATE_CLASSIFICATIONS_SUCCESS,
    message,
  };
};

export const updateClassificationsFail = message => {
  return {
    type: actionTypes.UPDATE_CLASSIFICATIONS_FAIL,
    message
  };
};

export const updateClassifications = (id, token, classification) => {
  return async dispatch => {
    dispatch(updateClassificationsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/classifications/${id}?token=${token}`;
    await axios.patch(url, classification)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateClassificationsSuccess(response.data.message));
          dispatch(fetchClassifications(token));
        } else {
          dispatch(updateClassificationsFail(response.data.message));
        }
      });
  }
};
