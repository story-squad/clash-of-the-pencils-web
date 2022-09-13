import './styles/index.scss';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { decode, sign } from 'jsonwebtoken';
import { useAuth0 } from '@auth0/auth0-react';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  dob: string;
  parentEmail: string;
  termsOfService: boolean;
  codename: string;
}
interface UserMetadata {
  codename: string;
}
interface AppMetadata {
  firstName: string;
  lastName: string;
  dob: string;
  parentEmail: string;
  termsOfService: boolean;
  voted?: boolean;
}
interface AuthToken {
  app_metadata: AppMetadata;
  created_at: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  identities: never[];
  ip: string;
  iss: string;
  multifactor: never[];
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  user_id: string;
  user_metadata: UserMetadata;
}

interface URLParams {
  state: string;
  token: string;
}

const SignupForm = (): React.ReactElement => {
  // HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  // STATE
  const [authStateValue, setAuthStateValue] = React.useState('');
  const [claims, setClaims] = React.useState<AuthToken>({} as AuthToken);

  // EFFECTS
  useEffect(() => {
    // without this, an empty object is logged with each render when there are no errors
    if (Object.keys(errors).length > 0) console.warn(errors);
  }, [errors]);
  useEffect(() => {
    getURLParams()
      .then((credentials) => setCredentials(credentials))
      .catch((err) => console.warn(err));
  }, []);

  // HELPERS
  const watchBirthday = watch('dob');
  const watchTermsOfService = watch('termsOfService');
  const watchCodeName = watch('codename');
  const currentYear = new Date().getFullYear();
  /**
   * @title getURLParams
   * @description Parses the URL for the `state` and `token` parameters
   * @param url The URL to parse
   * @returns {Object} An object containing the `state` and `token` values
   * @throws {Error} If the URL is missing the `state` or `token` values
   */
  const getURLParams = () => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const id_token = params.get('token');
    if (!state || !id_token) throw new Error('Missing state or token in URL');
    return Promise.resolve({ state, token: id_token });
  };

  /**
   * @title getDecodedToken
   * @description Decodes the JWT token and returns the decoded token as an object
   * @param token The JWT token to decode
   * @returns {Object} An object containing properties of the decoded token
   * @see {@linkcode getURLParams}
   * @throws {Error} If the token is undefined
   */
  const getDecodedToken = (token: string) => {
    if (!token) throw new Error('Missing token');
    return decode(token) as AuthToken;
  };

  /**
   * @title setCredentials
   * @description Sets the `authStateValue` and `sessionToken` values. Decodes the JWT token and sets the `claims` state.
   * @params {Object} An object containing the `state` and `token` values extracted from the URL
   * @see {@linkcode getURLParams}
   * @see {@linkcode getDecodedToken}
   */
  const setCredentials = async (credentials: URLParams) => {
    const { state, token } = credentials;
    const decodedToken = getDecodedToken(token);
    setAuthStateValue(state);
    setClaims(decodedToken);
  };
  /**
   * @title createInstance
   * @description Retrieves the Auth0 token from Session Storage and uses it to create an axios instance with the Auth0 token as the Authorization header.
   * @returns Axios instance with the session token as the Authorization header
   * @throws {Error} If an unhandled error occurs
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
      .then((token: string) => token)
      .catch((err: { error?: string }) => {
        if (err.error === 'login_required') {
          // Usually means the token has expired
          loginWithRedirect();
        }
        if (err.error === 'consent_required') {
          // User is missing required consent
          loginWithRedirect();
        }
        console.warn(err);
        throw new Error(err ? err.error : 'Error retrieving token');
      });
    if (!token) {
      console.warn('No token found');
      return;
    }
    return axios.create({
      baseURL: targetURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  /**
   * @title createJWT
   * @param updatedToken
   * @returns {string} A JWT token
   * @description Creates a JWT token using the updated token and the session token
   * @throws {Error} If the Auth0 client secret is undefined
   */
  const createJWT = (updatedToken: AuthToken) => {
    const secret = process.env.REACT_APP_AUTH0_CLIENT_SECRET; // this value needs to match the secret in the Auth0 post-login action
    if (!secret) throw new Error('Missing Auth0 client secret');
    return sign(updatedToken, secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
  };
  /**
   * @title updateClaims
   * @description Updates claims state with the additional properties from the form
   * @param {Object} data The data to update the claims with
   * @returns {Object} Promise.resolve() if successful
   */
  const updateClaims = async (data: SignupFormValues) => {
    const app_metadata: AppMetadata = {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      parentEmail: data.parentEmail,
      termsOfService: data.termsOfService,
      voted: false,
    };
    const user_metadata: UserMetadata = {
      codename: data.codename,
    };
    setClaims({
      ...claims,
      app_metadata,
      user_metadata,
    });
    return Promise.resolve();
  };

  // HANDLERS
  /**
   * @title onSubmit
   * @description Creates an axios instance with the Auth0 token as the Authorization header then sends the form data to the API.
   * @param {Object} data The form data
   * @see {@linkcode createInstance}
   * @see {@linkcode getURLParams}
   * @see {@linkcode getDecodedToken}
   */
  const onSubmit = async (data: SignupFormValues) => {
    console.groupCollapsed('%cSignup Form Submitted 🚀', 'color: #00bfa5');
    console.log('%cForm data 🤓', 'color: #00b4d8');
    console.table(data);
    console.groupEnd();
    const axiosAuth0Instance = await createInstance();
    updateClaims(data).then(() => {
      const jwt = createJWT(claims);
      axiosAuth0Instance?.post('/continue', {
        state: authStateValue,
        token: jwt,
      });
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
