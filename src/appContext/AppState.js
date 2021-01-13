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
  CONNECT,
  DISCONNECT,
} from './types';

const AppState = (props) => {
  const initialState = {
    error: null,
    isConnected: null,
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

    socket.on('user_room_created', ({ roomName, userName, roomID, userId }) => {
      console.log(userName);
      localStorage.setItem('user', userName);
      localStorage.setItem('room', roomName);
      localStorage.setItem('roomID', roomID);
      localStorage.setItem('userID', userId);
      dispatch({ type: CREATE_ROOM });
    });
    socket.on('disconnect', () => {
      dispatch({ type: DISCONNECT });
    });
    socket.on('connect', () => {
      dispatch({ type: CONNECT });
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

  const sendMessage = async (messageObject) => {
    socket.emit('send_message', messageObject);
  };

  const getAllRooms = async (longitude, latitude) => {
    console.log(longitude, latitude);
    socket.emit('getRooms', { longitude, latitude });
  };

  const fetchMessages = () => {
    socket.emit('fetchMessages', localStorage.getItem('roomID'));
  };

  const joinRoom = async (roomID, roomName) => {
    socket.emit('joinRoom', { roomID, roomName });
  };

  const leaveRoom = (roomID, userID) => {
    socket.emit('leaveRoom', { roomID, userID });
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
        isConnected: state.isConnected,
        readMessage,
        fetchMessages,
        sendMessage,
        joinRoom,
        getAllRooms,
        loadMessages,
        leaveRoom,
        createRoom,
        clearError,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
