import React, { useEffect, useState } from 'react';
import { Header } from '../../common';
import { ResetEmailForm } from './ResetEmailForm';
import { PasswordResetForm } from './ResetPasswordForm';

const ResetPasswordPage = (): React.ReactElement => {
  // deconsturct our current route - provides us everything after http://localhost:3000/
  const [showEmailForm, setShowEmailForm] = useState(true);

  useEffect(() => {
    if (showEmailForm) {
      // render the email form
      setShowEmailForm(true);
    } else {
      // render the password reset form
      setShowEmailForm(false);
    }
  }, []);

  return (
    <div className="landing-page">
      <Header />
      {showEmailForm ? <ResetEmailForm /> : <PasswordResetForm />}
    </div>
  );
};

export default ResetPasswordPage;
