import './styles/index.scss';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  dob: string;
  parentEmail: string;
  termsOfService: boolean;
  codename: string;
}
interface SessionToken {
  app_metadata: unknown;
  created_at: Date;
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  identities: unknown[];
  ip: string;
  iss: string;
  multifactor: unknown[];
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: Date;
  user_id: string;
  user_metadata: unknown;
}
const SignupForm = (): React.ReactElement => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();
  // State
  const [authState, setAuthState] = React.useState('');
  const [claims, setClaims] = React.useState({} as SessionToken);
  const [sessionToken, setSessionToken] = React.useState('');
  // Effects
  useEffect(() => {
    // without this, an empty object is logged with each render
    if (Object.keys(errors).length > 0) console.warn(errors);
  }, [errors]);
  useEffect(() => {
    // Extract the state parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    const token = urlParams.get('session_token') || '';
    const decodedToken: SessionToken = jwt_decode(token);
    // Set the state and claims in state
    setAuthState(state || '');
    setSessionToken(token);
    setClaims(decodedToken);
  }, []);
  // Helpers
  const watchBirthday = watch('dob');
  const watchTermsOfService = watch('termsOfService');
  const watchCodeName = watch('codename');
  const currentYear = new Date().getFullYear();
  // Handlers
  const onSubmit = (data: SignupFormValues) => {
    console.groupCollapsed('Signup Form Submitted');
    console.log('%cForm data', 'color: #00b4d8');
    console.table(data);
    console.groupEnd();
    /* Send this data to the API, which will redirect to the Auth0 /continue endpoint with the applicable data */
    const targetURL =
      process.env.REACT_APP_NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : `https://${process.env.REACT_APP_API_CLASH_API_URL}`;
    axios.post(`${targetURL}/continue?state=${authState}`, {
      payload: {
        user_metadata: {
          codename: data.codename,
        },
        app_metadata: {
          lastName: data.lastName || claims.family_name,
          firstName: data.firstName || claims.given_name,
          parentEmail: data.parentEmail,
          dob: data.dob,
          termsOfService: data.termsOfService,
          voted: false,
          role_id: 1, // Figure out how and when to determine the user's role
        },
      },
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!claims.given_name && (
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
      {!claims.family_name && (
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
          defaultValue={claims.nickname}
          {...register('codename', { required: true, maxLength: 100 })}
        />
      </label>
      {/* birthday input */}
      <label htmlFor="dob">
        Birthday
        <input
          id="dob"
          type="date"
          autoComplete="bday"
          {...register('dob', { required: true })}
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
