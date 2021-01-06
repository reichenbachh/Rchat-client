/* eslint-disable import/no-anonymous-default-export */
import {
  LOAD_MESSAGES,
  CREATE_ROOM,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  FETCH_ROOMS,
  READ_MESSAGES,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case READ_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        user: true,
      };
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.data.msg,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
