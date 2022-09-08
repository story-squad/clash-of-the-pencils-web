import './styles/index.scss';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  birthday: string;
  parentEmail: string;
  termsOfService: boolean;
  codename: string;
}

const SignupForm = (): React.ReactElement => {
  const { user, getAccessTokenSilently } = useAuth0();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();
  useEffect(() => {
    if (Object.keys(errors).length > 0) console.warn(errors);
  }, [errors]);
  const onSubmit = (data: SignupFormValues) => {
    console.groupCollapsed('Signup Form Submitted');
    console.log('%cUser data from Auth0 Provider', 'color: #00b4d8');
    console.table(user);
    console.log('%cForm data', 'color: #00b4d8');
    console.table(data);
    console.groupEnd();
    getAccessTokenSilently()
      .then((token) => {
        axios.patch(
          `${process.env.REACT_APP_AUTH0_AUDIENCE}/users/${user?.sub}`,
          {
            user_metadata: {
              codename: data.codename || user?.nickname,
            },
            app_metadata: {
              lastName: data.lastName || user?.family_name,
              firstName: data.firstName || user?.given_name,
              parentEmail: data.parentEmail,
              birthday: data.birthday,
              termsOfService: data.termsOfService,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  // console.log(errors);
  const watchBirthday = watch('birthday');
  const watchTermsOfService = watch('termsOfService');
  const watchCodeName = watch('codename');
  const currentYear = new Date().getFullYear();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!user?.given_name && (
        <label htmlFor="firstName">
          First Name
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            autoComplete="given-name"
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
            placeholder="Last Name"
            autoComplete="family-name"
            {...register('lastName', { required: true, maxLength: 100 })}
          />
        </label>
      )}
      {/* codename input */}
      <label htmlFor="codename">
        Code Name
        <input
          id="codename"
          type="text"
          placeholder="Codename"
          autoComplete="nickname"
          {...register('codename', { required: true, maxLength: 100 })}
        />
      </label>
      {/* birthday input */}
      <label htmlFor="birthday">
        Birthday
        <input
          id="birthday"
          type="date"
          autoComplete="bday"
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
