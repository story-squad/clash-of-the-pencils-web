import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import { Login } from './LoginForm';
import { Signout } from './Signout';
import { Signup } from './SignupForm';
import SignupSuccess from './SignupSuccess';

const AuthToggle = (props: Modal.ModalComponentProps): React.ReactElement => {
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
      <div className="auth-form">
        {isLogin ? <Login {...props} /> : <Signup />}
      </div>
    </div>
  );
};

const AuthModal = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = useRecoilState(auth.authModalOpen);
  const signupWasSuccessful = useRecoilValue(auth.signupWasSuccessful);
  const isSignout = useRecoilValue(auth.authModalIsLogout);

  return (
    <Modal.Component
      className="dark-blue"
      component={
        isSignout
          ? (props) => <Signout {...props} />
          : signupWasSuccessful
          ? SignupSuccess
          : (props) => <AuthToggle {...props} />
      }
      centered={signupWasSuccessful || isSignout}
      visible={modalOpen}
      setVisible={setModalOpen}
    />
  );
};

export default AuthModal;
