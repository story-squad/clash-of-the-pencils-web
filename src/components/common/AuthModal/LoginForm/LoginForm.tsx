import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../../api';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import welcomeBack from '../../../../assets/img/welcome-back.png';
import { auth } from '../../../../state';
import { Input } from '../../Input';
import { Modal } from '../../Modal';

const LoginForm = (props: Modal.ModalComponentProps): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const login = useSetRecoilState(auth.isLoggedIn);
  const setAuthModalOpen = useSetRecoilState(auth.authModalOpen);
  const setAuthIsLogin = useSetRecoilState(auth.authModalIsLogin);

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    Auth.login(data)
      .then((res) => {
        login(res.data.token);
        setAuthModalOpen(false);
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        let message: string;
        if (err.response?.data?.message) {
          message = err.response.data.message;
        } else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dragon-boi">
        <DragonBoi className="dragon login-dragon" />
      </div>
      <img src={welcomeBack} alt="Welcome Back" />
      <p>Ready to write? Sign in below to get back into the game.</p>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <div className="inputs">
        <Input
          id="loginCodename"
          name="codename"
          label="Codename"
          type="codename"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your codename!' }}
          placeholder="Enter your codename"
        />
        <Input
          id="loginPassword"
          name="password"
          label="Password"
          type="password"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter a password!' }}
          placeholder="Enter your password"
        />
      </div>

      <input
        type="submit"
        className="login"
        value="Sign In"
        onClick={() => clearErrors('form')}
      />

      <div className="text">
        Forgot your password?{' '}
        <Link to="/reset" onClick={props.closeModal} className="text-button">
          Click Here
        </Link>
        .
      </div>

      <div className="text">
        Still need an account?{' '}
        <span onClick={() => setAuthIsLogin(false)} className="text-button">
          Click Here
        </span>
        .
      </div>
    </form>
  );
};

export default LoginForm;
