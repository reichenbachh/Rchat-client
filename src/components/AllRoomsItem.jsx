import React from 'react';

const AllRoomsItem = ({ roomData, joinRoom }) => {
  return (
    <div className='room-list-item'>
      <p>{roomData.roomName}</p>
      <button
        onClick={() => {
          joinRoom(roomData.roomID, roomData.roomName);
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default AllRoomsItem;
