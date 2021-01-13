import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../common';
import { SendResetEmailForm } from './SendResetEmailForm';
import { UpdatePasswordForm } from './UpdatePasswordForm';

const ResetPasswordPage = (): React.ReactElement => {
  // If true, shows SendResetEmailForm, else shows UpdatePasswordForm
  const [showEmailForm, setShowEmailForm] = useState(true);

  // state to be passed to the reset password form
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCode, setUserCode] = useState<string | null>(null);

  // establish the URL / location in a variable to use in our useEffect
  const location = useLocation();

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
    <div>
      <Header />
      <div className="reset-password-page">
        {showEmailForm ? (
          <SendResetEmailForm />
        ) : (
          <UpdatePasswordForm
            // We can coerce types here because our useEffect ensures we only show this form if both are true
            email={userEmail as string}
            code={userCode as string}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
