/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import React, { useCallback } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';
// import { useSetRecoilState } from 'recoil';
// import { Auth, Clever } from '../../../api';
// import { useOpenDashboard } from '../../../hooks';
// import { auth } from '../../../state';
// import { LoginForm } from '../../forms';
// import { DashboardTemplate } from '../../templates';
// import './styles/index.scss';

// export interface LoginViewProps {
//   onSubmit?: (data: Auth.ILoginBody) => void;
//   openSignup?: () => void;
//   openForgotPassword?: () => void;
//   openForgotCodename?: () => void;
// }

// export default function LoginView({
//   onSubmit,
//   // Clever Auth Params
//   isMerge = false,
//   cleverId,
//   codename,
//   // Route Handling
//   openSignup,
//   openForgotCodename,
//   openForgotPassword,
// }: LoginViewProps & Clever.MergeRedirectState): React.ReactElement {
//   // Get form methods for the provider
//   const methods = useForm({ defaultValues: { codename } });

//   // Get login selector from Recoil
//   const login = useSetRecoilState(auth.login);

//   const openDash = useOpenDashboard();

//   // Memoize the passed in submit handler if there was one, else use our custom function
//   const submitHandler = useCallback(
//     onSubmit ??
//       (async (data: Auth.ILoginBody) => {
//         const res = await (() => {
//           if (isMerge && cleverId) return Clever.mergeAccounts(data, cleverId);
//           else return Auth.login(data);
//         })();
//         login(res);
//         openDash();
//       }),
//     [login, onSubmit, isMerge, cleverId],
//   );

//   return (
//     <DashboardTemplate useStorySquadHeader className="login-view">
//       <div className="login-header">
//         {/* TODO Clever button future reimplementation */}
//         {/* {isMerge ? (
//           <>
//             {codename && <h2>Hey, {codename}!</h2>}
//             <p>
//               <em>It looks like you already have a Story Squad account!</em>
//             </p>
//             <p>
//               Enter your password below to automatically link your Clever and
//               Story Squad accounts.
//             </p>
//           </>
//         ) : (
//           <>
//             <CleverButton htmlType="button" />
//             <p className="alt-font">or</p>
//             <p>Sign In Using Story Squad Account</p>
//           </>
//         )} */}
//       </div>
//       <FormProvider {...methods}>
//         <LoginForm onSubmit={submitHandler} />
//       </FormProvider>
//       <p className="form-footer">
//         Need to create an account?{' '}
//         <span className="all-caps" onClick={openSignup}>
//           Sign&nbsp;Up&nbsp;Here
//         </span>
//       </p>
//       <p className="form-footer forgot">
//         <span onClick={openForgotCodename}>Forgot Codename?</span>
//       </p>
//       <p className="form-footer forgot">
//         <span onClick={openForgotPassword}>Forgot Password?</span>
//       </p>
//     </DashboardTemplate>
//   );
// }

// 1. GET to 8000/api/auth/login
// 2. Sign in using the Auth0 UI
// 3. Get user metadata from Auth0
// 4. The API will send back user metadata to be set in Recoil state
import { useState, useEffect } from 'react';
import axios from 'axios';

const loginInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/auth',
});

export default function LoginView() {
  const [userMetadata, setUserMetadata] = useState({});
  useEffect(() => {
    loginInstance
      .get('/api/auth/login')
      .then((response) => setUserMetadata(response))
      .then(() => console.log(userMetadata))
      .then(() => window.location.replace('/dashboard'))
      .catch((error) => console.error(error));
  }, []);
}
