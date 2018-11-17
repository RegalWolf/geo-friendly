import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchMapsStart = () => {
  return {
    type: actionTypes.FETCH_MAPS_START
  };
};

export const fetchMapsSuccess = maps => {
  return {
    type: actionTypes.FETCH_MAPS_SUCCESS,
    maps
  };
};

export const fetchMapsFail = error => {
  return {
    type: actionTypes.FETCH_MAPS_FAIL,
    error
  };
};

export const fetchMaps = token => {
  return async dispatch => {
    dispatch(fetchMapsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/maps?token=${token}`;
    await axios.get(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(fetchMapsSuccess(response.data.data));
        } else {
          await dispatch(fetchMapsFail(response.data.message));
        }
      });
  }
};

export const postMapsStart = () => {
  return {
    type: actionTypes.POST_MAPS_START,
  };
};

export const postMapsSuccess = message => {
  return {
    type: actionTypes.POST_MAPS_SUCCESS,
    message
  };
};

export const postMapsFail = message => {
  return {
    type: actionTypes.POST_MAPS_FAIL,
    message
  };
};

export const postMaps = (maps, token) => {
  return async dispatch => {
    dispatch(postMapsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/maps?token=${token}`;
    await axios.post(url, maps)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postMapsSuccess(response.data.message));
          dispatch(fetchMaps(token));
        } else {
          dispatch(postMapsFail(response.data.message));
        }
      });
  }
};

export const deleteMapsStart = () => {
  return {
    type: actionTypes.DELETE_MAPS_START
  };
};

export const deleteMapsSuccess = message => {
  return {
    type: actionTypes.DELETE_MAPS_SUCCESS,
    message
  };
};

export const deleteMapsFail = message => {
  return {
    type: actionTypes.DELETE_MAPS_FAIL,
    message
  };
};

export const deleteMaps = (id, token) => {
  return async dispatch => {
    dispatch(deleteMapsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/maps/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteMapsSuccess(response.data.message));
          dispatch(fetchMaps(token));
        } else {
          dispatch(deleteMapsFail(response.data.message));
        }
      });
  }
};

export const updateMapsStart = () => {
  return {
    type: actionTypes.UPDATE_MAPS_START
  };
};

export const updateMapsSuccess = message => {
  return {
    type: actionTypes.UPDATE_MAPS_SUCCESS,
    message,
  };
};

export const updateMapsFail = message => {
  return {
    type: actionTypes.UPDATE_MAPS_FAIL,
    message
  };
};

export const updateMaps = (id, token, map) => {
  return async dispatch => {
    dispatch(updateMapsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/maps/${id}?token=${token}`;
    await axios.patch(url, map)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateMapsSuccess(response.data.message));
          dispatch(fetchMaps(token));
        } else {
          dispatch(updateMapsFail(response.data.message));
        }
      });
  };
};
