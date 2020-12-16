import React, { useState } from 'react';
import { Header } from '../../common';
import { ResetEmailForm } from './ResetEmailForm';
import { PasswordResetForm } from './ResetPasswordForm';

const ResetPasswordPage = (): React.ReactElement => {
  // deconsturct our current route - provides us everything after http://localhost:3000/
  //   const { url } = useRouteMatch();
  //   console.log('URL: ', url);
  const [showEmailForm, setShowEmailForm] = useState(false);

  // useEffect(() => {
  //   if (url === '/reset') {
  //     // render the email form
  //     setShowEmailForm(true);
  //   } else if (url === `/passwordreset?code=${code}&email=${email}`) {
  //     // render the password reset form
  //     setShowEmailForm(false);
  //   }
  // }, [url]);

  return (
    <div className="landing-page">
      <Header />
      {showEmailForm ? <ResetEmailForm /> : <PasswordResetForm />}
    </div>
  );
};

export default ResetPasswordPage;
