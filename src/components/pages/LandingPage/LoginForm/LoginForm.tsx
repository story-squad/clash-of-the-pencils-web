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
          name="Codename"
          label="Codename"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your codename!' }}
          placeholder="Enter your codename"
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
        <input
          type="submit"
          value="Sign In"
          onClick={() => clearErrors('form')}
        />
        <div className="text login">
          Forgot your password? <Link to="/comingsoon">Click Here.</Link>
        </div>
        <div className="text login">
          Need an account? <Link to="/register">Click Here.</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
