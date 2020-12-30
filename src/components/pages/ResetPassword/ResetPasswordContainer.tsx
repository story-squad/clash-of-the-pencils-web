import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../common';
import { ResetEmailForm } from './EmailForm';
import { PasswordResetForm } from './PasswordForm';

const ResetPasswordPage = (): React.ReactElement => {
  // state to be passed to the reset password form
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCode, setUserCode] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(true);

  // establish the URL / location in a varaible to use in our useEffect
  const location = useLocation();
  //   const { url } = useRouteMatch();

  useEffect(() => {
    const pathname = location.search;
    const parsedUrl = parse(pathname);
    if (typeof parsedUrl.email === 'string') {
      setUserEmail(parsedUrl.email);
    }
    if (typeof parsedUrl.code === 'string') {
      setUserCode(parsedUrl.code);
    }
  }, []);

  // useeffect for reading url to redirect you to proper page
  useEffect(() => {
    // if the user code exists then set showEmail form to false
    if (userCode && userEmail) {
      setShowEmailForm(false);
    }
  }, [userEmail, userCode]);

  return (
    <div className="submission-page-container">
      <Header />
      <div className="landing-page-container">
        {showEmailForm ? (
          <ResetEmailForm />
        ) : (
          <PasswordResetForm
            email={userEmail as string}
            code={userCode as string}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
