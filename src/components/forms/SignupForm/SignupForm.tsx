import './styles/index.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  birthday: string;
  parentEmail: string;
  termsOfService: boolean;
  codeName: string;
}

const SignupForm = (): React.ReactElement => {
  const { user } = useAuth0();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();
  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };
  console.log(errors);
  const watchBirthday = watch('birthday');
  const currentYear = new Date().getFullYear();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!user?.given_name && (
        <input
          type="text"
          placeholder="First name"
          {...register('firstName', { required: true, maxLength: 80 })}
        />
      )}
      {!user?.family_name && (
        <input
          type="text"
          placeholder="Last name"
          {...register('lastName', { required: true, maxLength: 100 })}
        />
      )}
      {/* codeName input */}
      <input
        type="text"
        placeholder={user?.nickname || 'Code name'}
        {...register('codeName', { required: true, maxLength: 100 })}
      />
      <input type="date" {...register('birthday', { required: true })} />
      {/* Displays parent email input if user is under 13 */}
      {Number(new Date(watchBirthday).getFullYear()) >
        Number(currentYear) - 13 && (
        <input
          type="email"
          placeholder="Parent email"
          {...register('parentEmail', { required: true })}
        />
      )}
      <input
        type="checkbox"
        placeholder="Terms of Service"
        {...register('termsOfService', { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default SignupForm;
