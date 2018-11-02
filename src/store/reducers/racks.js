import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  racks: [],
  error: null,
  loading: false,
  add: {
    status: false,
    message: null
  },
  delete: {
    status: false,
    message: null
  },
  update: {
    status: false,
    message: null
  }
};

const fetchRacksStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchRacksSuccess = (state, action) => {
  return updateObject(state, {
    racks: action.racks,
    error: null,
    loading: false
  });
};

const fetchRacksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const postRacksStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    add: {
      status: false,
      message: null
    }
  });
};

const postRacksSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: true,
      message: action.message
    }
  });
};

const postRacksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    add: {
      status: false,
      message: action.message
    }
  });
};

const deleteRacksStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    delete: {
      status: false,
      message: null
    }
  });
};

const deleteRacksSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: true,
      message: action.message
    }
  });
};

const deleteRacksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    delete: {
      status: false,
      message: action.message
    }
  });
};

const updateRacksStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    update: {
      status: false,
      message: null
    }
  });
};

const updateRacksSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: true,
      message: action.message
    }
  });
};

const updateRacksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    update: {
      status: false,
      message: action.message
    }
  });
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_RACKS_START:
      return fetchRacksStart(state, action);
    case actionTypes.FETCH_RACKS_SUCCESS:
      return fetchRacksSuccess(state, action);
    case actionTypes.FETCH_RACKS_FAIL:
      return fetchRacksFail(state, action);
    case actionTypes.POST_RACKS_START:
      return postRacksStart(state, action);
    case actionTypes.POST_RACKS_SUCCESS:
      return postRacksSuccess(state, action);
    case actionTypes.POST_RACKS_FAIL:
      return postRacksFail(state, action);
    case actionTypes.DELETE_RACKS_START:
      return deleteRacksStart(state, action);
    case actionTypes.DELETE_RACKS_SUCCESS:
      return deleteRacksSuccess(state, action);
    case actionTypes.DELETE_RACKS_FAIL:
      return deleteRacksFail(state, action);
    case actionTypes.UPDATE_RACKS_START:
      return updateRacksStart(state, action);
    case actionTypes.UPDATE_RACKS_SUCCESS:
      return updateRacksSuccess(state, action);
    case actionTypes.UPDATE_RACKS_FAIL:
      return updateRacksFail(state, action);
    default:
      return state;
  }
};

export default reducer;