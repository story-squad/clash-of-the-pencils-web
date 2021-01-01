import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Input } from '../..';
import { Auth } from '../../../../api';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import welcomeBackPNG from '../../../../assets/img/PNGs/welcome-back.png';
import welcomeBackWEBP from '../../../../assets/img/WebPs/welcome-back.webp';
import { auth } from '../../../../state';
import { token } from '../../../../utils';
import { Image } from '../../../common';
import { Modal } from '../../Modal';

const LoginForm = (props: Modal.ModalComponentProps): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const login = useSetRecoilState(auth.isLoggedIn);
  const setAuthModalOpen = useSetRecoilState(auth.authModalOpen);

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    Auth.login(data)
      .then((res) => {
        token.set(res.data.token);
        login(true);
        setAuthModalOpen(false);
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        if (err.response)
          setError('form', {
            type: 'manual',
            message: err.response.data.error,
          });
        else {
          setError('form', {
            type: 'manual',
            message: 'Uh oh! Login unsuccessful',
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dragon-boi">
        <DragonBoi className="dragon login-dragon" />
      </div>
      <Image webp={welcomeBackWEBP} src={welcomeBackPNG} alt="Welcome Back" />
      <p>Hey! Sign in below to get back into the game.</p>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <div className="inputs">
        <Input
          name="email"
          label="Email"
          type="email"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your email!' }}
          placeholder="Enter your email"
        />
        <Input
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
    </form>
  );
};

export default LoginForm;
