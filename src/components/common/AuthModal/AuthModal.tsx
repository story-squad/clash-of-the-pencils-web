import React from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';

const AuthToggle = (props: Modal.ModalComponentProps): React.ReactElement => {
  const [isLogin, setIsLogin] = useRecoilState(auth.authModalIsLogin);

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
      <div className="auth-form">
        {isLogin ? (
          <Login closeModal={props.closeModal} />
        ) : (
          <Signup closeModal={props.closeModal} />
        )}
      </div>
    </div>
  );
};

const AuthModal = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = useRecoilState(auth.authModalOpen);
  return (
    <Modal.Component
      className="dark-blue"
      component={(props) => <AuthToggle {...props} />}
      visible={modalOpen}
      setVisible={setModalOpen}
    />
  );
};

export default AuthModal;
