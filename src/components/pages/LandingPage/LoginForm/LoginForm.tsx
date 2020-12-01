import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../../../../api';
import welcomeBack from '../../../../assets/img/welcome-back.png';
import { token } from '../../../../utils';
import { Input, ThoughtBubble } from '../../../common';
import { DragonBoi } from '../DragonBoi';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const { push } = useHistory();

  const onSubmit: SubmitHandler<Auth.LoginBody> = (data) => {
    Auth.login(data)
      .then((res) => {
        token.set(res.data.token);
        push('/dashboard');
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        setError('form', {
          type: 'manual',
          message: 'Uh Oh! Login Unsuccessful',
        });
      });
  };

  return (
    <div className="landing-form">
      <div className="landing-splash">
        <ThoughtBubble render={() => <>Welcome back!</>} />
        <DragonBoi />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={welcomeBack} alt="Welcome Back" />
        <p>Hey! Sign in below to get back into the game.</p>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <Input
          name="email"
          label="Email"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your email!' }}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter a password!' }}
        />
        <div className="text">
          Need an account? <Link to="/register">Click Here.</Link>
        </div>
        <input
          type="submit"
          value="Sign In"
          onClick={() => clearErrors('form')}
        />
      </form>
    </div>
  );
};

export default LoginForm;
