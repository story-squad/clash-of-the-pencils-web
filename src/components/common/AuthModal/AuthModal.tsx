import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';
import SignupSuccess from './SignupSuccess';

const AuthToggle = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useRecoilState(auth.authModalIsLogin);
  const signupWasSuccessful = useRecoilValue(auth.signupWasSuccessful);

  const setForm = (isLogin: boolean) => {
    setIsLogin(isLogin);
  };

  console.log({ signupWasSuccessful });

  return signupWasSuccessful ? (
    <SignupSuccess />
  ) : (
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
  return (
    <Modal.Component
      className="dark-blue"
      component={AuthToggle}
      visible={modalOpen}
      setVisible={setModalOpen}
    />
  );
};

export default AuthModal;
