import './styles/index.scss';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';
import { useAuth0 } from '@auth0/auth0-react';
interface SignupFormValues {
  firstName: string;
  lastName: string;
  dob: string;
  parentEmail: string;
  termsOfService: boolean;
  codename: string;
}
interface DecodedToken {
  app_metadata: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    parentEmail?: string;
    termsOfService?: boolean;
  };
  created_at: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  identities: [];
  ip: string;
  iss: string;
  multifactor: [];
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  user_id: string;
  user_metadata: {
    codename?: string;
  };
}
const SignupForm = (): React.ReactElement => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  // State
  const [authState, setAuthState] = React.useState('');
  const [claims, setClaims] = React.useState({});
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
    const decodedToken: DecodedToken = decode(token);
    console.log(decodedToken);
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
  /**
   * @title createInstance
   * @description Retrieves the Auth0 token from Session Storage and uses it to create an axios instance with the Auth0 token as the Authorization header.
   * @returns Axios instance with the session token as the Authorization header
   */
  const createInstance = async () => {
    const targetURL =
      process.env.REACT_APP_NODE_ENV === 'development'
        ? 'http://localhost:8000/api/auth'
        : `https://${process.env.REACT_APP_API_CLASH_API_URL}`;
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'update:users update:users_app_metadata',
    })
      .then((token) => token)
      .catch((err) => {
        if (err.error === 'login_required') {
          // Usually means the token has expired
          loginWithRedirect();
        }
        if (err.error === 'consent_required') {
          // User is missing required consent
          loginWithRedirect();
        }
        console.warn(err);
      });
    if (!token) {
      console.error('No token found');
      return;
    }
    return axios.create({
      baseURL: targetURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // Handlers
  const onSubmit = async (data: SignupFormValues) => {
    console.groupCollapsed('%cSignup Form Submitted 🚀', 'color: #00bfa5');
    console.log('%cForm data 🤓', 'color: #00b4d8');
    console.table(data);
    console.groupEnd();
    const axiosAuth0Instance = await createInstance();
    const userData = {
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
    };
    // add userData to the session token
    const updatedToken = { ...claims };
    updatedToken.user_metadata = userData.user_metadata;
    updatedToken.app_metadata = userData.app_metadata;
    // create JWT from updated token

    axiosAuth0Instance
      ?.post(`/continue?state=${authState}?token=${sessionToken}`)
      .then((res: unknown) => {
        console.log(res);
      })
      .catch((err: unknown) => {
        console.error(err);
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
