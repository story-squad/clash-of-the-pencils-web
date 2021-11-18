import React from 'react';
import { AccountCard } from '../../atoms';

export default function AccountCards({
  //Items must be passed in same order as the are in the item title
  codename,
  firstname,
  dob,
  email,
  lastname,
}: AccountUserProps): React.ReactElement {
  return (
    <>
      <AccountCard
        cardTitle={'codename'}
        itemTitle={[`${codename}`]}
        codeNameDescription
      />
      <AccountCard
        // edit
        cardTitle={'account info'}
        itemTitle={['Email Address', 'Password']}
        itemContent={[`${email}`, `• • • • • • • •`]}
      />
      <AccountCard
        // edit
        cardTitle={'personal info'}
        itemTitle={['First Name', 'Last Name', 'Birthday']}
        itemContent={[`${firstname}`, `${lastname}`, `${dob}`]}
      />
    </>
  );
}

interface AccountUserProps {
  codename: string;
  email: string;
  firstname: string;
  lastname: string | undefined;
  dob: string | undefined;
}
