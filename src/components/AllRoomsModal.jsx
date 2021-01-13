import React, { useEffect } from 'react';
import AllRoomsItem from './AllRoomsItem';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AllRoomsModal = ({ getAllRooms, loading, rooms, joinRoom }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getAllRooms(lon, lat);
    });
  }, []);

  let supportsGeo;
  console.log(rooms);

  if (navigator.geolocation) {
    supportsGeo = true;
  } else {
    supportsGeo = false;
  }
  if (rooms) {
    return (
      <div>
        <Popup trigger={<button>Available Rooms</button>} modal>
          {supportsGeo ? (
            <div className='room-list'>
              <h1>Rooms Around You</h1>
              {rooms.map((room) => (
                <AllRoomsItem
                  roomData={room}
                  joinRoom={joinRoom}
                  key={room.roomID}
                />
              ))}
            </div>
          ) : (
            <h1>
              Device doesnt support the geoloaction API,geoloaction is needed to
              use this app
            </h1>
          )}
        </Popup>
      </div>
    );
  }

  return (
    <div>
      <Popup trigger={<button>Fetching Rooms</button>} modal>
        <h1>Fetching Rooms</h1>
      </Popup>
    </div>
  );
};

export default AllRoomsModal;
