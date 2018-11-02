import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAcquisitionsStart = () => {
  return {
    type: actionTypes.FETCH_ACQUISITIONS_START
  };
};

export const fetchAcquisitionsSuccess = acquisitions => {
  return {
    type: actionTypes.FETCH_ACQUISITIONS_SUCCESS,
    acquisitions
  };
};

export const fetchAcquisitionsFail = error => {
  return {
    type: actionTypes.FETCH_ACQUISITIONS_FAIL,
    error
  };
};

export const fetchAcquisitions = token => {
  return dispatch => {
    dispatch(fetchAcquisitionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/acquisitions?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchAcquisitionsSuccess(response.data.data));
        } else {
          dispatch(fetchAcquisitionsFail(response.data.message));
        }
      });
  }
};

export const postAcquisitionsStart = () => {
  return {
    type: actionTypes.POST_ACQUISITIONS_START,
  };
};

export const postAcquisitionsSuccess = message => {
  return {
    type: actionTypes.POST_ACQUISITIONS_SUCCESS,
    message
  };
};

export const postAcquisitionsFail = message => {
  return {
    type: actionTypes.POST_ACQUISITIONS_FAIL,
    message
  };
};

export const postAcquisitions = (acquisition, token) => {
  return async dispatch => {
    dispatch(postAcquisitionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/acquisitions?token=${token}`;
    await axios.post(url, acquisition)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postAcquisitionsSuccess(response.data.message));
          dispatch(fetchAcquisitions(token));
        } else {
          dispatch(postAcquisitionsFail(response.data.message));
        }
      });
  }
};

export const deleteAcquisitionsStart = () => {
  return {
    type: actionTypes.DELETE_ACQUISITIONS_START
  };
};

export const deleteAcquisitionsSuccess = message => {
  return {
    type: actionTypes.DELETE_ACQUISITIONS_SUCCESS,
    message
  };
};

export const deleteAcquisitionsFail = message => {
  return {
    type: actionTypes.DELETE_ACQUISITIONS_FAIL,
    message
  };
};

export const deleteAcquisitions = (id, token) => {
  return async dispatch => {
    dispatch(deleteAcquisitionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/acquisitions/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteAcquisitionsSuccess(response.data.message));
          dispatch(fetchAcquisitions(token));
        } else {
          dispatch(deleteAcquisitionsFail(response.data.message));
        }
      });
  }
};

export const updateAcquisitionsStart = () => {
  return {
    type: actionTypes.UPDATE_ACQUISITIONS_START
  };
};

export const updateAcquisitionsSuccess = message => {
  return {
    type: actionTypes.UPDATE_ACQUISITIONS_SUCCESS,
    message,
  };
};

export const updateAcquisitionsFail = message => {
  return {
    type: actionTypes.UPDATE_ACQUISITIONS_FAIL,
    message
  };
};

export const updateAcquisitions = (id, token, acquisition) => {
  return async dispatch => {
    dispatch(updateAcquisitionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/acquisitions/${id}?token=${token}`;
    await axios.patch(url, acquisition)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateAcquisitionsSuccess(response.data.message));
          dispatch(fetchAcquisitions(token));
        } else {
          dispatch(updateAcquisitionsFail(response.data.message));
        }
      });
  }
};
