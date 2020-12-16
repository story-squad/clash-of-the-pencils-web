import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header } from '../../common';
import { ResetEmailForm } from './ResetEmailForm';
import { PasswordResetForm } from './ResetPasswordForm';

const ResetPasswordPage = (): React.ReactElement => {
  // deconsturct our current route - provides us everything after http://localhost:3000/
  const { url } = useRouteMatch();
  console.log('URL: ', url);

  // state to test conditional rendering off of url
  const [resetState, setResetState] = useState(true);

  return (
    <div className="landing-page">
      <Header />
      {resetState ? <ResetEmailForm /> : <PasswordResetForm />}
    </div>
  );
};

export default ResetPasswordPage;
