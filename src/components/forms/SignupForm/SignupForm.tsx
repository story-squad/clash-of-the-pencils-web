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
  const watchTermsOfService = watch('termsOfService');
  const watchCodeName = watch('codeName');
  const currentYear = new Date().getFullYear();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!user?.given_name && (
        <label htmlFor="firstName">
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            {...register('firstName', { required: true, maxLength: 80 })}
          />
        </label>
      )}
      {!user?.family_name && (
        <label htmlFor="lastName">
          Last Name
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            {...register('lastName', { required: true, maxLength: 100 })}
          />
        </label>
      )}
      {/* codeName input */}
      <label htmlFor="codeName">
        Code Name
        <input
          id="codeName"
          type="text"
          placeholder="Code Name"
          {...register('codeName', { required: true, maxLength: 100 })}
        />
      </label>
      {/* birthday input */}
      <label htmlFor="birthday">
        Birthday
        <input
          id="birthday"
          type="date"
          {...register('birthday', { required: true })}
        />
      </label>
      {/* Displays parent email input if user is under 13 */}
      {Number(new Date(watchBirthday).getFullYear()) >
        Number(currentYear) - 13 && (
        <label htmlFor="parentEmail">
          Parent Email
          <input
            id="parentEmail"
            type="email"
            placeholder="Parent email"
            {...register('parentEmail', { required: true })}
          />
        </label>
      )}
      {/* terms of service checkbox */}
      <label htmlFor="termsOfService">
        <input
          id="termsOfService"
          type="checkbox"
          placeholder="Terms of Service"
          {...register('termsOfService', { required: true })}
        />
        I agree to the terms of service
      </label>
      <input
        type="submit"
        disabled={!watchBirthday || !watchTermsOfService || !watchCodeName} // will need to add better validation
      />
    </form>
  );
};

export default SignupForm;
