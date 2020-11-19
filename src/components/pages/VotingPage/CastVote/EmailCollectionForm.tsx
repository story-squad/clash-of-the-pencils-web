import React from 'react';
import ConvertKitForm from 'convertkit-react';

const EmailCollectionForm = (): React.ReactElement => {
  return (
    <div className="email-collection">
      <h1>Find Out Who Wins!</h1>
      <ConvertKitForm className="ck-fm" formId={1826783} hideName={true} />
    </div>
  );
};

export default EmailCollectionForm;
