import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';
import SignupSuccess from './SignupSuccess';

const AuthToggle = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useRecoilState(auth.authModalIsLogin);

  const setForm = (isLogin: boolean) => {
    setIsLogin(isLogin);
  };

  return (
    <div className="auth-modal">
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

const AuthModal = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = useRecoilState(auth.authModalOpen);
  const signupWasSuccessful = useRecoilValue(auth.signupWasSuccessful);

  return (
    <Modal.Component
      className="dark-blue"
      component={signupWasSuccessful ? SignupSuccess : AuthToggle}
      centered={signupWasSuccessful}
      visible={modalOpen}
      setVisible={setModalOpen}
    />
  );
};

export default AuthModal;
