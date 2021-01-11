import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../../api';
import { resetUsername } from '../../../../../api/Users';
import { Input } from '../../../../common';

const UsernameForm = (): React.ReactElement => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm({
    mode: 'onChange',
  });

  // onSubmit update the users username ("codename")
  const onSubmit: SubmitHandler<{
    currentusername: string;
    newusername: string;
    confirmusername: string;
  }> = (data) => {
    console.log('Form Submitted: ', data);

    const usernameBody = {
      currentusername: data.currentusername,
      newusername: data.newusername,
      confirmusername: data.confirmusername,
    };

    // Reset the username from the data provided in the form
    resetUsername(usernameBody)
      .then(() => {
        clearErrors();
        console.log('Successful username reset!');
      })
      .catch((err: Auth.AxiosError) => {
        let message: string;
        if (err.response?.data) {
          message = err.response.data.error;
        } else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };

  // Regex to check entered codename contains only letters and numbers
  const usernamePattern = /^[A-Za-z0-9]*$/;

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="currentusername"
          name="currentusername"
          label="Old Codename"
          type="text"
          errors={errors}
          register={register}
          rules={{
            required: 'Please enter your old codename',
            validate: {
              checkCharacters: (value) => {
                return (
                  usernamePattern.test(value) ||
                  'Only letters and numbers are allowed.'
                );
              },
            },
          }}
        />
        <Input
          id="newusername"
          name="newusername"
          label="New Codename"
          type="text"
          errors={errors}
          register={register}
          rules={{ required: 'Please enter your new codename' }}
        />
        <Input
          id="confirmusername"
          name="confirmusername"
          label="Confirm New Codename"
          type="text"
          errors={errors}
          register={register}
          rules={{ required: 'Please confirm your new codename' }}
        />
        <input
          className="update-username-submit-btn"
          type="submit"
          value="Update Username"
          onClick={() => clearErrors('form')}
        />
      </form>
    </div>
  );
};

export default UsernameForm;
