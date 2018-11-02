import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchRacksStart = () => {
  return {
    type: actionTypes.FETCH_RACKS_START
  };
};

export const fetchRacksSuccess = racks => {
  return {
    type: actionTypes.FETCH_RACKS_SUCCESS,
    racks
  };
};

export const fetchRacksFail = error => {
  return {
    type: actionTypes.FETCH_RACKS_FAIL,
    error
  };
};

export const fetchRacks = token => {
  return dispatch => {
    dispatch(fetchRacksStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/racks?token=${token}`;
    axios.get(url)
      .then(response => {
        if (response.data.status) {
          dispatch(fetchRacksSuccess(response.data.data));
        } else {
          dispatch(fetchRacksFail(response.data.message));
        }
      });
  }
};

export const postRacksStart = () => {
  return {
    type: actionTypes.POST_RACKS_START,
  };
};

export const postRacksSuccess = message => {
  return {
    type: actionTypes.POST_RACKS_SUCCESS,
    message
  };
};

export const postRacksFail = message => {
  return {
    type: actionTypes.POST_RACKS_FAIL,
    message
  };
};

export const postRacks = (rack, token) => {
  return async dispatch => {
    dispatch(postRacksStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/racks?token=${token}`;
    await axios.post(url, rack)
      .then(async response => {
        if (response.data.status) {
          await dispatch(postRacksSuccess(response.data.message));
          dispatch(fetchRacks(token));
        } else {
          dispatch(postRacksFail(response.data.message));
        }
      });
  }
};

export const deleteRacksStart = () => {
  return {
    type: actionTypes.DELETE_RACKS_START
  };
};

export const deleteRacksSuccess = message => {
  return {
    type: actionTypes.DELETE_RACKS_SUCCESS,
    message
  };
};

export const deleteRacksFail = message => {
  return {
    type: actionTypes.DELETE_RACKS_FAIL,
    message
  };
};

export const deleteRacks = (id, token) => {
  return async dispatch => {
    dispatch(deleteRacksStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/racks/${id}?token=${token}`;
    await axios.delete(url)
      .then(async response => {
        if (response.data.status) {
          await dispatch(deleteRacksSuccess(response.data.message));
          dispatch(fetchRacks(token));
        } else {
          dispatch(deleteRacksFail(response.data.message));
        }
      });
  }
};

export const updateRacksStart = () => {
  return {
    type: actionTypes.UPDATE_RACKS_START
  };
};

export const updateRacksSuccess = message => {
  return {
    type: actionTypes.UPDATE_RACKS_SUCCESS,
    message,
  };
};

export const updateRacksFail = message => {
  return {
    type: actionTypes.UPDATE_RACKS_FAIL,
    message
  };
};

export const updateRacks = (id, token, rack) => {
  return async dispatch => {
    dispatch(updateRacksStart());
    const url = `https://g3ofriendly.gurisa.com/api/v1/racks/${id}?token=${token}`;
    await axios.patch(url, rack)
      .then(async response => {
        if (response.data.status) {
          await dispatch(updateRacksSuccess(response.data.message));
          dispatch(fetchRacks(token));
        } else {
          dispatch(updateRacksFail(response.data.message));
        }
      });
  };
};
