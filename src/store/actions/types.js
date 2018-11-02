import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchTypesStart = () => {
  return {
    type: actionTypes.FETCH_TYPES_START
  };
};

export const fetchTypesSuccess = types => {
  return {
    type: actionTypes.FETCH_TYPES_SUCCESS,
    types
  };
};

export const fetchTypesFail = error => {
  return {
    type: actionTypes.FETCH_TYPES_FAIL,
    error
  };
};

export const fetchTypes = token => {
  return dispatch => {
    dispatch(fetchTypesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/types?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchTypesSuccess(response.data.data));
        } else {
          dispatch(fetchTypesFail(response.data.message));
        }
      });
  }
};

export const postTypesStart = () => {
  return {
    type: actionTypes.POST_TYPES_START,
  };
};

export const postTypesSuccess = message => {
  return {
    type: actionTypes.POST_TYPES_SUCCESS,
    message
  };
};

export const postTypesFail = message => {
  return {
    type: actionTypes.POST_TYPES_FAIL,
    message
  };
};

export const postTypes = (type, token) => {
  return async dispatch => {
    dispatch(postTypesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/types?token=${token}`;
    await axios.post(url, type)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postTypesSuccess(response.data.message));
          dispatch(fetchTypes(token));
        } else {
          dispatch(postTypesFail(response.data.message));
        }
      });
  }
};

export const deleteTypesStart = () => {
  return {
    type: actionTypes.DELETE_TYPES_START
  };
};

export const deleteTypesSuccess = message => {
  return {
    type: actionTypes.DELETE_TYPES_SUCCESS,
    message
  };
};

export const deleteTypesFail = message => {
  return {
    type: actionTypes.DELETE_TYPES_FAIL,
    message
  };
};

export const deleteTypes = (id, token) => {
  return async dispatch => {
    dispatch(deleteTypesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/types/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteTypesSuccess(response.data.message));
          dispatch(fetchTypes(token));
        } else {
          dispatch(deleteTypesFail(response.data.message));
        }
      });
  }
};

export const updateTypesStart = () => {
  return {
    type: actionTypes.UPDATE_TYPES_START
  };
};

export const updateTypesSuccess = message => {
  return {
    type: actionTypes.UPDATE_TYPES_SUCCESS,
    message,
  };
};

export const updateTypesFail = message => {
  return {
    type: actionTypes.UPDATE_TYPES_FAIL,
    message
  };
};

export const updateTypes = (id, token, type) => {
  return async dispatch => {
    dispatch(updateTypesStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/types/${id}?token=${token}`;
    await axios.patch(url, type)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateTypesSuccess(response.data.message));
          dispatch(fetchTypes(token));
        } else {
          dispatch(updateTypesFail(response.data.message));
        }
      });
  }
};
