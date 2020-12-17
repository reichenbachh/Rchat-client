import Preloader from "../assets/preloader.gif";
import React from "react";

const Prelader = () => {
  return (
    <div id='home'>
      <div className='home-content'>
        <div className='content'>
          <img src={Preloader} alt='loading' />
        </div>
      </div>
    </div>
  );
};

export default Prelader;
