import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchCollectionsStart = () => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_START
  };
};

export const fetchCollectionsSuccess = collections => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_SUCCESS,
    collections
  };
};

export const fetchCollectionsFail = errors => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_FAIL,
    errors
  };
};

export const fetchCollections = token => {
  return async dispatch => {
    dispatch(fetchCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections?token=${token}`;
    await axios.get(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(fetchCollectionsSuccess(response.data.data));
        } else {
          await dispatch(fetchCollectionsFail(response.data.message));
        }
      });
  }
};

export const postCollectionsStart = () => {
  return {
    type: actionTypes.POST_COLLECTIONS_START,
  };
};

export const postCollectionsSuccess = (collection, message) => {
  return {
    type: actionTypes.POST_COLLECTIONS_SUCCESS,
    message,
    collection
  };
};

export const postCollectionsFail = errors => {
  return {
    type: actionTypes.POST_COLLECTIONS_FAIL,
    errors
  };
};

export const postCollections = (collection, token) => {
  return async dispatch => {
    dispatch(postCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections?token=${token}`;
    await axios.post(url, collection)
      .then(response => {
        dispatch(postCollectionsSuccess(response.data.data, response.data.message));
      })
      .catch(err => {
        dispatch(postCollectionsFail(err.response.data));
      });
  }
};

export const deleteCollectionsStart = () => {
  return {
    type: actionTypes.DELETE_COLLECTIONS_START
  };
};

export const deleteCollectionsSuccess = message => {
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
    dispatch(deleteCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteCollectionsSuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(deleteCollectionsFail(response.data.message));
        }
      });
  }
};

export const updateCollectionsStart = () => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_START
  };
};

export const updateCollectionsSuccess = (collection, message) => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_SUCCESS,
    collection,
    message,
  };
};

export const updateCollectionsFail = errors => {
  return {
    type: actionTypes.UPDATE_COLLECTIONS_FAIL,
    errors
  };
};

export const updateCollections = (id, token, collection) => {
  return async dispatch => {
    dispatch(updateCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections/${id}?token=${token}`;
    await axios.patch(url, collection)
      .then(async response => {
        console.log(response);
        await dispatch(updateCollectionsSuccess(response.data.data, response.data.message));
        dispatch(fetchCollections(token));
      })
      .catch(err => {
        dispatch(updateCollectionsFail(err.response.data));
      });
  };
};
