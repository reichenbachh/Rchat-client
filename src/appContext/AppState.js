import React, { useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import AppContext from './AppContext';
import AppReducer from './AppReducer';

import {
  CREATE_ROOM,
  CLEAR_ERROR,
  FETCH_ROOMS,
  SET_LOADING,
  READ_MESSAGES,
} from './types';

const AppState = (props) => {
  const initialState = {
    error: null,
    user: null,
    rooms: null,
    loading: null,
    messages: [],
    roomData: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const socket = io('http://localhost:8080');

  const loadMessages = async () => {
    socket.on('connection', (connection) => {
      console.log('connected');
    });

    socket.on('user_room_created', ({ roomName, userName, roomID }) => {
      console.log(userName);
      localStorage.setItem('user', userName);
      localStorage.setItem('room', roomName);
      localStorage.setItem('roomID', roomID);
      dispatch({ type: CREATE_ROOM });
    });
    socket.on('rooms-fected', (data) => {
      // console.log(data);
      dispatch({ type: FETCH_ROOMS, payload: data });
    });
  };

  const readMessage = () => {
    socket.on('readMessage', (messages) => {
      dispatch({ type: READ_MESSAGES, payload: messages });
    });
  };

  const sendMessage = async (messageObject, roomID) => {
    console.log(roomID);
    socket.emit('send_message', { messageObject, roomID });
  };

  const getAllRooms = async (longitude, latitude) => {
    console.log(longitude, latitude);
    socket.emit('getRooms', { longitude, latitude });
  };

  const fetchMessages = () => {
    socket.emit('fetchMessages', localStorage.getItem('roomID'));
  };

  const joinRoom = async (lon, lat) => {
    socket.emit('joinRoom', { lon, lat });
  };

  const setLoading = () => {
    return dispatch({ type: SET_LOADING });
  };

  const createRoom = async (roomName, lon, lat) => {
    socket.emit('createRoom', { roomName, lon, lat });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        messages: state.messages,
        error: state.error,
        rooms: state.rooms,
        loading: state.loading,
        readMessage,
        fetchMessages,
        sendMessage,
        joinRoom,
        getAllRooms,
        loadMessages,
        createRoom,
        clearError,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
