import React from 'react';

interface SplashProps {
  component: React.ComponentType;
}

const Splash = ({
  component: Component,
  ...props
}: SplashProps): React.ReactElement => {
  return (
    <div className="splash">
      <Component {...props} />
    </div>
  );
};

export default Splash;
