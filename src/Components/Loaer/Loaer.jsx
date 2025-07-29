import React from 'react';
import logo from '../../assets/Momo Run.json'
import Lottie from 'lottie-react';
const Loaer = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
  <Lottie style={{width: '100px'}} animationData={logo}  loop={true}></Lottie>
            </div>
    );
};

export default Loaer;