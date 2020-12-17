import React, { useReducer } from "react";
import axios from "axios";
import io from "socket.io-client";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

import {
  LOAD_MESSAGES,
  SET_ERROR,
  SET_LOADING,
  CREATE_ROOM,
  CLEAR_ERROR,
  SET_USER,
} from "./types";

const AppState = (props) => {
  const initialState = {
    error: null,
    user: null,
    loading: null,
    messages: [],
    roomData: null,
  };

  const [state, dispatch] = useReducer(AppReducer, AppState);
  const loadMessages = async () => {
    const socket = io("http://localhost:8080");
    socket.on("connection", (connection) => {
      console.log("connected");
    });
  };

  //actions
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const createRoom = async () => {
    try {
      setLoading();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        "http://localhost:8080/createRoom",
        config
      );
      dispatch({ type: CREATE_ROOM, payload: response.data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: SET_ERROR, payload: error.response });
    }
  };

  const userExists = async (data) => {
    try {
      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/chatExists",
        data,
        config
      );
      dispatch({ type: SET_USER, payload: response.data });
    } catch (error) {
      console.log("no user");
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        messages: state.messages,
        roomData: state.roomData,
        error: state.error,
        loadMessages,
        createRoom,
        clearError,
        userExists,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
