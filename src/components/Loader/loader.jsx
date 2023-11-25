import BeatLoader from 'react-spinners/BeatLoader';
import React from 'react';

const Loader = props => {
  return (
    <div
      className="sweet-loading"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999999,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        opacity: 0.6,
        display: props.loading ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BeatLoader
        color={'#0D73BD'}
        loading={props.loading}
        size={15}
        speedMultiplier="1"
      />
    </div>
  );
};
export default Loader;
