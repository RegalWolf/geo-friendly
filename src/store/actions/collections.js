import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchCollectionstart = () => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_START
  };
};

export const fetchCollectionsuccess = collections => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_SUCCESS,
    collections
  };
};

export const fetchCollectionsFail = error => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_FAIL,
    error
  };
};

export const fetchCollections = token => {
  return dispatch => {
    dispatch(fetchCollectionstart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchCollectionsuccess(response.data.data));
        } else {
          dispatch(fetchCollectionsFail(response.data.message));
        }
      });
  }
};

export const postCollectionstart = () => {
  return {
    type: actionTypes.POST_COLLECTIONS_START,
  };
};

export const postCollectionsuccess = message => {
  return {
    type: actionTypes.POST_COLLECTIONS_SUCCESS,
    message
  };
};

export const postCollectionsFail = message => {
  return {
    type: actionTypes.POST_COLLECTIONS_FAIL,
    message
  };
};

export const postCollections = (collection, token) => {
  return async dispatch => {
    dispatch(postCollectionstart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections?token=${token}`;
    await axios.post(url, collection)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postCollectionsuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(postCollectionsFail(response.data.message));
        }
      });
  }
};

export const deleteCollectionstart = () => {
  return {
    type: actionTypes.DELETE_COLLECTIONS_START
  };
};

export const deleteCollectionsuccess = message => {
  return {
    type: actionTypes.DELETE_COLLECTIONS_SUCCESS,
    message
  };
};

export const deleteCollectionsFail = message => {
  return {
    type: actionTypes.DELETE_COLLECTIONS_FAIL,
    message
  };
};

export const deleteCollections = (id, token) => {
  return async dispatch => {
    dispatch(deleteCollectionstart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteCollectionsuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(deleteCollectionsFail(response.data.message));
        }
      });
  }
};

export const updateCollectionstart = () => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_START
  };
};

export const updateCollectionsuccess = message => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_SUCCESS,
    message,
  };
};

export const updateCollectionsFail = message => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_FAIL,
    message
  };
};

export const updateCollections = (id, token, collection) => {
  return async dispatch => {
    dispatch(updateCollectionstart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections/${id}?token=${token}`;
    await axios.patch(url, collection)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateCollectionsuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(updateCollectionsFail(response.data.message));
        }
      });
  };
};
