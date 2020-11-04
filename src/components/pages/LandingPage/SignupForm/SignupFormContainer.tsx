import React, { useState } from 'react';

import { Auth } from '../../../../api';

import { Modal } from '../../../common';
import RenderSignupForm from './RenderSignupForm';
import SignupSuccess from './SignupSuccess';

const initialFormState = {
  username: '',
  email: '',
  parentEmail: '',
  password: '',
  confirm: '',
  ageStr: '',
};

const SignupForm = (): React.ReactElement => {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Format form data for API call body
    const credentials = Auth.formatSignupBody(form);
    Auth.signup(credentials)
      .then(() => {
        setError(null);
        setShowModal(true);
      })
      .catch((err: Auth.AxiosError) => {
        if (err.response?.data) {
          setError(err.response.data.error);
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        component={SignupSuccess}
        closable={false}
        centered={true}
      />
      <RenderSignupForm
        form={form}
        error={error}
        changeHandler={changeHandler}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SignupForm;
