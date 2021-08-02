import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../api';
import { Input, Modal } from '../../../common';
import ResetPageSuccess from '../ResetPageSuccess';

const PasswordForm = (
  props: Omit<Auth.IPassResetPostBody, 'password'>,
): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors, watch } =
    useForm({
      mode: 'onChange',
    });
  const [showModal, setShowModal] = useState(false);

  // onSubmit should send the users email a reset password link/token that has a 10 min timer
  const onSubmit: SubmitHandler<{
    password: string;
  }> = (data) => {
    const userBody = {
      email: props.email,
      code: props.code,
      password: data.password,
    };

    //TODO - redirect user?
    Auth.updatePassword(userBody)
      .then(() => {
        clearErrors();
        setShowModal(true);
      })
      .catch((err: Auth.AxiosError) => {
        console.log({ err });
        let message: string;
        if (
          err.response?.data &&
          typeof err.response.data.message === 'string'
        ) {
          message = err.response.data.message;
        } else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  return (
    <>
      <Modal.Component
        className="reset-modal"
        visible={showModal}
        setVisible={setShowModal}
        component={(props) => (
          <ResetPageSuccess
            buttonText="Login"
            message="Your password has been reset!"
            openAuthModalAfter
            {...props}
          />
        )}
        closable
        centered
        title="Success!"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="password-reqs">
          <h2>Password Requirements</h2>
          <ul>
            <li>Between 8 and 32 characters</li>
            <li>Includes at least 1 capital letter</li>
            <li>Includes at least 1 number</li>
          </ul>
        </section>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <div className="inputs">
          <Input
            id="resetPassword"
            name="password"
            label="New Password"
            type="password"
            showPassword
            errors={errors}
            register={register}
            rules={{
              required: 'Password is required!',
              validate: {
                // checks entered password value contains required characters
                includesCapital: (value) => {
                  const pattern = /[A-Z]/;
                  return (
                    pattern.test(value) ||
                    'Password must include at least 1 capital letter'
                  );
                },
                includesNumber: (value) => {
                  const pattern = /[0-9]/;
                  return (
                    pattern.test(value) ||
                    'Password must include at least 1 number'
                  );
                },
                // checks that entered password value is a minimum of 8 chars
                checkLength: (value) => {
                  return (
                    (value.length >= 8 && value.length <= 32) ||
                    'Password must be between 8 and 32 characters.'
                  );
                },
              },
            }}
          />
          <Input
            id="resetConfirm"
            name="confirm"
            label="Confirm New Password"
            type="password"
            showPassword
            errors={errors}
            register={register}
            rules={{
              required: 'Password confirmation is required!',
              validate: (value) => {
                // checks that the values in password and confirm inputs match
                return value === watch('password') || "Passwords don't match!";
              },
            }}
          />
        </div>
        <input
          className="submit-button"
          type="submit"
          value="Reset Password"
          onClick={() => clearErrors('form')}
        />
      </form>
    </>
  );
};

export default PasswordForm;
