import React, { useContext, useEffect, Fragment } from 'react';
import ChatBoxUI from '../components/ChatBoxUI';
import Preloader from './Preloader';
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
    createRoom,
    user,
    loading,
    clearError,
    error,
    userExists,
  } = appContext;
  useEffect(() => {
    appContext.loadMessages();
    if (error) {
      ToastsStore.error(error);
      clearError();
    }
  }, [user, loading, error]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    userExists({ userId });
    //eslint-disable-next-line
  }, []);
  if (loading) {
    return (
      <Fragment>
        <Preloader />
      </Fragment>
    );
  }
  if (user) {
    return (
      <Fragment>
        <ChatBoxUI />
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_CENTER}
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <HomeLanding createRoom={createRoom} />
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_CENTER}
      />
    </Fragment>
  );
};

export default Home;
