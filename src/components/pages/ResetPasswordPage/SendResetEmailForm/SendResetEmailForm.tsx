import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../api';
import { Input, Modal } from '../../../common';
import ResetPageSuccess from '../ResetPageSuccess';

const SendEmailResetForm = (): React.ReactElement => {
  const [showModal, setShowModal] = useState(false);
  // deconstruct our useForm() methods
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  // onSubmit should send the users email a reset password link/token that has a 10 min timer
  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log('Form Submitted: ');
    const userEmail = data.email;
    Auth.getResetEmail(userEmail)
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
            buttonText="Close"
            message="Email sent!"
            {...props}
          />
        )}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Password Reset</h2>
        <p>Enter your email to receive a link:</p>
        {errors.form && (
          <div className="server-error">{errors.form.message}</div>
        )}
        <div className="inputs">
          <Input
            id="resetEmail"
            name="email"
            label="Email"
            errors={errors}
            register={register}
            rules={{ required: 'Please enter your email!' }}
          />
        </div>
        <input
          className="submit-button"
          type="submit"
          value="Send"
          onClick={() => clearErrors('form')}
        />
      </form>
    </>
  );
};

export default SendEmailResetForm;
