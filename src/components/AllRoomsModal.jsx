import React, { useEffect } from 'react';
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

  const handleJoinRoom = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon);
      joinRoom(lon, lat);
    });
  };

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
        <Popup trigger={<button>Find Rooms</button>} modal>
          {supportsGeo ? (
            <div className='room-list'>
              <h1>Rooms Around You</h1>
              {rooms.map((room) => (
                <div className='room-list-item'>
                  <p>{room.roomName}</p>
                  <button onClick={handleJoinRoom}>Join Room</button>
                </div>
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
