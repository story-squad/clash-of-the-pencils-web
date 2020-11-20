import React from 'react';
import ConvertKitForm from 'convertkit-react';

const convertKitProps = {
  className: 'ck-fm',
  formId: 1826783,
  showLabels: true,
  emailLabel: 'Email',
  emailPlaceholder: null,
  nameLabel: 'First Name',
  namePlaceholder: null,
};

const EmailCollectionForm = (): React.ReactElement => {
  return (
    <div className="email-collection">
      <h2>Find Out Who Wins!</h2>
      <ConvertKitForm {...convertKitProps} />
    </div>
  );
};

export default EmailCollectionForm;
