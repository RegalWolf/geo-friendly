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

export const fetchCollectionsFail = error => {
  return {
    type: actionTypes.FETCH_COLLECTIONS_FAIL,
    error
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

export const postCollectionsSuccess = message => {
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
    console.log(collection);
    dispatch(postCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections?token=${token}`;
    await axios.post(url, collection)
      .then(async response => {
        console.log('response');
        console.log(response);
        if (response.data.status) {
          await dispatch(postCollectionsSuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(postCollectionsFail(response.data.message));
        }
      })
      .catch(err => {
        console.log('err');
        console.log(err);
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

export const updateCollectionsSuccess = message => {
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
    dispatch(updateCollectionsStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/collections/${id}?token=${token}`;
    await axios.patch(url, collection)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateCollectionsSuccess(response.data.message));
          dispatch(fetchCollections(token));
        } else {
          dispatch(updateCollectionsFail(response.data.message));
        }
      });
  };
};
