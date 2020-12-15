import React, { useState } from 'react';
import { Login } from '../../pages/LandingPage/LoginForm';
import { Signup } from '../../pages/LandingPage/SignupForm';

const AuthToggle = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useState(true);

  const setForm = (isLogin: boolean) => {
    setIsLogin(isLogin);
  };

  return (
    <div className="auth-toggle">
      <div className="auth-switcher">
        <span className={isLogin ? 'active' : ''} onClick={() => setForm(true)}>
          Log In
        </span>
        <span
          className={!isLogin ? 'active' : ''}
          onClick={() => setForm(false)}
        >
          Sign Up
        </span>
      </div>
      <div className="auth-form">{isLogin ? <Login /> : <Signup />}</div>
    </div>
  );
};

export default AuthToggle;
