import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAgesStart = () => {
  return {
    type: actionTypes.FETCH_AGES_START
  };
};

export const fetchAgesSuccess = ages => {
  return {
    type: actionTypes.FETCH_AGES_SUCCESS,
    ages
  };
};

export const fetchAgesFail = error => {
  return {
    type: actionTypes.FETCH_AGES_FAIL,
    error
  };
};

export const fetchAges = token => {
  return dispatch => {
    dispatch(fetchAgesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/ages?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchAgesSuccess(response.data.data));
        } else {
          dispatch(fetchAgesFail(response.data.message));
        }
      });
  }
};

export const postAgesStart = () => {
  return {
    type: actionTypes.POST_AGES_START,
  };
};

export const postAgesSuccess = message => {
  return {
    type: actionTypes.POST_AGES_SUCCESS,
    message
  };
};

export const postAgesFail = message => {
  return {
    type: actionTypes.POST_AGES_FAIL,
    message
  };
};

export const postAges = (age, token) => {
  return async dispatch => {
    dispatch(postAgesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/ages?token=${token}`;
    await axios.post(url, age)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postAgesSuccess(response.data.message));
          dispatch(fetchAges(token));
        } else {
          dispatch(postAgesFail(response.data.message));
        }
      });
  }
};

export const deleteAgesStart = () => {
  return {
    type: actionTypes.DELETE_AGES_START
  };
};

export const deleteAgesSuccess = message => {
  return {
    type: actionTypes.DELETE_AGES_SUCCESS,
    message
  };
};

export const deleteAgesFail = message => {
  return {
    type: actionTypes.DELETE_AGES_FAIL,
    message
  };
};

export const deleteAges = (id, token) => {
  return async dispatch => {
    dispatch(deleteAgesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/ages/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteAgesSuccess(response.data.message));
          dispatch(fetchAges(token));
        } else {
          dispatch(deleteAgesFail(response.data.message));
        }
      });
  }
};

export const updateAgesStart = () => {
  return {
    type: actionTypes.UPDATE_AGES_START
  };
};

export const updateAgesSuccess = message => {
  return {
    type: actionTypes.UPDATE_AGES_SUCCESS,
    message,
  };
};

export const updateAgesFail = message => {
  return {
    type: actionTypes.UPDATE_AGES_FAIL,
    message
  };
};

export const updateAges = (id, token, age) => {
  return async dispatch => {
    dispatch(updateAgesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/ages/${id}?token=${token}`;
    await axios.patch(url, age)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateAgesSuccess(response.data.message));
          dispatch(fetchAges(token));
        } else {
          dispatch(updateAgesFail(response.data.message));
        }
      });
  };
};
