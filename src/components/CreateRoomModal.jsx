import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const CreateRoomModal = ({ createRoom }) => {
  const [createInput, setCreateInput] = useState('');
  const onChange = (e) => {
    setCreateInput(e.target.value);
  };

  const handleRoomCreate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      createRoom(createInput, lon, lat);
    });
  };

  return (
    <Popup trigger={<button>Create Room</button>} modal>
      {(close) => (
        <div className='create-room-form'>
          <div className='search_box'>
            <h1>Enter room name</h1>
            <input type='text' onChange={onChange} />
            <button
              onClick={() => {
                handleRoomCreate();
                close();
              }}
              className='create-btn'
            >
              Create
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CreateRoomModal;
