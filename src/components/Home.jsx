import React, { useContext, useEffect, Fragment } from 'react';
import ChatBoxUI from '../components/ChatBoxUI';

import HomeLanding from './HomeLanding';
import AppContext from '../appContext/AppContext';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

const Home = () => {
  const appContext = useContext(AppContext);
  const {
    isConnected,
    createRoom,
    loading,
    loadMessages,
    user,
    joinRoom,
    rooms,
    getAllRooms,
    readMessage,
    leaveRoom,
    sendMessage,
    fetchMessages,
    messages,
  } = appContext;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
    loadMessages();
  }, [user]);

  console.log(isConnected);
  const userCreated = localStorage.getItem('user');
  if (userCreated) {
    return (
      <Fragment>
        <ChatBoxUI
          fetchMessages={fetchMessages}
          messages={messages}
          sendMessage={sendMessage}
          readMessage={readMessage}
          isConnected={isConnected}
          leaveRoom={leaveRoom}
        />
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_CENTER}
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <HomeLanding
        joinRoom={joinRoom}
        loading={loading}
        getAllRooms={getAllRooms}
        createRoom={createRoom}
        rooms={rooms}
      />
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_CENTER}
      />
    </Fragment>
  );
};

export default Home;
