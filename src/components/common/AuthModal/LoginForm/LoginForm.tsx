import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Input } from '../..';
import { Auth } from '../../../../api';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import welcomeBack from '../../../../assets/img/welcome-back.png';
import { auth } from '../../../../state';
import { token } from '../../../../utils';
import { Modal } from '../../Modal';

const LoginForm = (props: Modal.ModalComponentProps): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const login = useSetRecoilState(auth.isLoggedIn);

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    Auth.login(data)
      .then((res) => {
        token.set(res.data.token);
        login(true);
        props.closeModal();
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
    <div className="landing-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dragon-boi">
          <DragonBoi className="dragon" />
        </div>
        <img src={welcomeBack} alt="Welcome Back" />
        <p>Hey! Sign in below to get back into the game.</p>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <div className="inputs">
          <Input
            name="email"
            label="Codename"
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
          value="Sign In"
          onClick={() => clearErrors('form')}
        />
        <div className="text change-form">
          Forgot your password? <Link to="/comingsoon">Click Here.</Link>
        </div>
        <div className="text change-form">
          Need an account? <Link to="/register">Click Here.</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
