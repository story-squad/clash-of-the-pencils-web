import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../../../api';
import { Modal } from '../../../common';
import SignupSuccess from './SignupSuccess';
import { useForm, SubmitHandler } from 'react-hook-form';

const SignupForm = (): React.ReactElement => {
  const {
    register,
    errors,
    watch,
    handleSubmit,
    clearErrors,
    setError,
  } = useForm();
  const [showModal, setShowModal] = useState(false);

  const formError = (message: string): void =>
    setError('form', { type: 'manual', message });

  const onSubmit: SubmitHandler<Auth.SignupFormState> = (data): void => {
    // Format form data for API call body
    const credentials = Auth.formatSignupBody(data);
    Auth.signup(credentials)
      .then(() => {
        clearErrors();
        setShowModal(true);
      })
      .catch((err: Auth.AxiosError) => {
        if (err.response?.data) {
          formError(err.response.data.error);
        } else {
          formError('An unknown error occurred. Please try again.');
        }
      });
  };

  useEffect(() => {
    console.log(errors);
    if (Object.values(errors).some((f) => f.type === 'required')) {
      formError('Fields cannot be empty!');
    } else if (errors.password) {
      formError(errors.password.message);
    } else if (errors.confirm) {
      formError(errors.confirm.message);
    } else if (errors.ageStr) {
      formError(errors.ageStr.message);
    } else if (errors.parentEmail) {
      formError(errors.parentEmail.message);
    }
  }, [errors]);

  return (
    <>
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        component={SignupSuccess}
        closable={false}
        centered={true}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up!</h2>
        <label>
          <input
            ref={register({ required: 'Username is required!' })}
            name="username"
            placeholder="Username"
            className={errors.username ? 'error' : undefined}
          />
        </label>
        <label>
          <input
            ref={register({ required: 'Email is required!' })}
            name="email"
            placeholder="Email"
            className={errors.email ? 'error' : undefined}
          />
        </label>
        <label>
          <input
            ref={register({
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters.',
              },
              maxLength: {
                value: 32,
                message: 'Password must not be longer than 32 characters.',
              },
              pattern: {
                value: /(?=.*[A-Za-z])(?=.*\d)/,
                message:
                  'Password must contain at least one letter and number.',
              },
            })}
            name="password"
            placeholder="Password"
            type="password"
            className={errors.password ? 'error' : undefined}
          />
        </label>
        <label>
          <input
            ref={register({
              required: 'Password confirmation is required!',
              validate: (value) =>
                value === watch('password') || "Passwords don't match!",
            })}
            name="confirm"
            placeholder="Confirm Password"
            type="password"
            className={errors.confirm ? 'error' : undefined}
          />
        </label>
        <label>
          <input
            ref={register({
              required: 'Age is required!',
              validate: (value) => !!parseInt(value) || 'Age must be a number!',
            })}
            name="ageStr"
            placeholder="Age"
            className={errors.ageStr ? 'error' : undefined}
          />
        </label>
        {/* If the user is younger than 13, require a parent email */}
        {parseInt(watch('ageStr')) < 13 && (
          <label>
            <input
              ref={register({
                validate: (value) => {
                  if (parseInt(watch('ageStr')) < 13)
                    return value.length > 1 || 'Parent email is required!';
                  else return true;
                },
              })}
              name="parentEmail"
              placeholder="Parent Email"
              className={errors.parentEmail ? 'error' : undefined}
            />
          </label>
        )}
        {errors.form && <div className="error">{errors.form.message}</div>}
        <input
          type="submit"
          value="Sign Up"
          onClick={() => clearErrors('form')}
        />
        <div className="tos">
          By signing up with our site, you are agreeing to our{' '}
          <span className="text-button">Terms & Conditions</span>.
        </div>
        <div>
          Already have an account?
          <br />
          <Link to="/login">Log In Here!</Link>
        </div>
        <button>Just Voting</button>
      </form>
    </>
  );
};

export default SignupForm;
