/* eslint-disable import/no-anonymous-default-export */
import {
  LOAD_MESSAGES,
  CREATE_ROOM,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_USER,
} from "./types";

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
    case CREATE_ROOM:
      localStorage.setItem("id", action.payload.user.userId);
      return {
        ...state,
        roomData: action.payload,
        user: action.payload.user,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.data.msg,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
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
