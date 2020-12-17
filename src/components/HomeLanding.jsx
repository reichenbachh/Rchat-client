import React from "react";
import logo from "../assets/logo.png";
const HomeLanding = ({ createRoom }) => {
  return (
    <div id='home'>
      <div className='home-content'>
        <div className='content'>
          <img src={logo} className='logo' alt='' />
          <h1>Message people around you ananymously</h1>
          <div className='btns'>
            <button>Find ChatRoom</button>
            <button
              onClick={() => {
                createRoom();
              }}
            >
              Create ChatRoom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;
