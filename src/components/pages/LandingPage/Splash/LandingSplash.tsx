import React from 'react';
import LoginSplash from './LoginSpash';
import SignupSplash from './SignupSplash';

const Splash = ({ isLogin }: SplashProps): React.ReactElement => {
  return (
    <div className="splash">
      <h1>Story Squad</h1>
      {isLogin ? <LoginSplash /> : <SignupSplash />}
    </div>
  );
};

interface SplashProps {
  isLogin: boolean;
}

export default Splash;
