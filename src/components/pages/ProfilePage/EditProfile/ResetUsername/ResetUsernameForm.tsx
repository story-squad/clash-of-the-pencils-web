import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth, Users } from '../../../../../api';
import { dataConstraints } from '../../../../../config';
import { Input } from '../../../../common';

const UsernameForm = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  // onSubmit update the users username ("codename")
  const onSubmit: SubmitHandler<Users.UpdateUsernameBody> = (data) => {
    console.log('Form Submitted: ', data);

    const usernameBody = {
      currentusername: data.currentusername,
      newusername: data.newusername,
      confirmusername: data.confirmusername,
    };

    // Reset the username from the data provided in the form
    Users.resetUsername(usernameBody)
      .then(() => {
        clearErrors();
        console.log('Successful username reset!');
      })
      .catch((err: Auth.AxiosError) => {
        let message: string;
        console.log({ err });
        if (err.response?.data.message) message = err.response.data.message;
        else if (err.response?.data.error) message = err.response.data.error;
        else {
          message = 'An unknown error occurred. Please try again.';
        }
        setError('form', { type: 'manual', message });
      });
  };
  useEffect(() => console.log(getValues()), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <Input
        id="currentusername"
        name="currentusername"
        label="Old Codename"
        type="text"
        errors={errors}
        register={register}
        rules={{
          required: 'Please enter your old codename',
        }}
      />
      <Input
        id="newusername"
        name="newusername"
        label="New Codename"
        type="text"
        errors={errors}
        register={register}
        rules={{
          required: 'Codename is required!',
          validate: {
            checkCharacters: (value) => {
              return (
                // ensures the user's entered codename contains only allowed characters
                dataConstraints.codenamePattern.test(value) ||
                'Only letters and numbers are allowed.'
              );
            },
            checkLength: (value) => {
              return value.length < 15 || 'Cannot be more than 15 characters.';
            },
          },
        }}
      />
      <Input
        id="confirmusername"
        name="confirmusername"
        label="Confirm New Codename"
        type="text"
        errors={errors}
        register={register}
        rules={{
          required: 'Codename confirmation is required!',
          validate: (value) => {
            // checks that the values in password and confirm inputs match
            return value === watch('newusername') || "Codenames don't match!";
          },
        }}
      />
      <input
        className="update-username-submit-btn"
        type="submit"
        value="Update Username"
        onClick={() => clearErrors('form')}
      />
    </form>
  );
};

export default UsernameForm;
