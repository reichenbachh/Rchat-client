import React from 'react';
import logo from '../assets/logo.png';
import CreateRoomModal from '../components/CreateRoomModal';
import AllRoomsModal from '../components/AllRoomsModal';
const HomeLanding = ({ createRoom, getAllRooms, loading, rooms, joinRoom }) => {
  return (
    <div id='home'>
      <div className='home-content'>
        <div className='content'>
          <img src={logo} className='logo' alt='' />
          <h1>Message people around you ananymously</h1>
          <div className='btns'>
            <AllRoomsModal
              joinRoom={joinRoom}
              getAllRooms={getAllRooms}
              rooms={rooms}
              loading={loading}
            />
            <CreateRoomModal createRoom={createRoom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;
