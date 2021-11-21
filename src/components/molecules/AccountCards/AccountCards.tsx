import React from 'react';
import { AccountCard } from '../../atoms';

export default function AccountCards({
  editInfo,
  editPersonal,
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
        edit
        cardTitle={'account info'}
        itemTitle={['Email Address', 'Password']}
        itemContent={[`${email}`, `• • • • • • • •`]}
        openEdit={editInfo}
      />
      <AccountCard
        edit
        cardTitle={'personal info'}
        itemTitle={['First Name', 'Last Name', 'Birthday']}
        itemContent={[`${firstname}`, `${lastname}`, `${dob}`]}
        openEdit={editPersonal}
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
  editInfo: () => void;
  editPersonal: () => void;
}
