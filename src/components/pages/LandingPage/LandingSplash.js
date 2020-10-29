import React from 'react';

const Splash = ({ component: Component, ...props }) => {
  return (
    <div className="splash">
      <Component {...props} />
    </div>
  );
};

export default Splash;
