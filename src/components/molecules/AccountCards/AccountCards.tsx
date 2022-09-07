import React from 'react';
import { AccountCard } from '../../atoms';

export default function AccountCards({
  editInfo,
  editPersonal,
  //Items must be passed in same order as the are in the item title
  codename,
  firstName,
  dob,
  email,
  lastname,
}: AccountUserProps): React.ReactElement {
  return (
    <>
      <AccountCard
        cardTitle={'codename'}
        itemContent={[
          {
            title: `${codename}`,
            content:
              ' Your codename is a name used to keep your identity secret. Think of it as your story-writing alter-ego that uniquely identifies you to other players. Your codename is case sensitive and you can’t change it once your account has been created.',
          },
        ]}
        desc
      />
      <AccountCard
        edit
        cardTitle={'account info'}
        itemContent={[
          { title: 'Email Address', content: `${email}` },
          { title: 'Password', content: '• • • • • • •' },
        ]}
        openEdit={editInfo}
      />
      <AccountCard
        edit
        cardTitle={'personal info'}
        itemContent={[
          { title: 'First Name', content: `${firstName}` },
          { title: 'Last Name', content: `${lastname}` },
          { title: 'Birthday', content: `${dob}` },
        ]}
        openEdit={editPersonal}
      />
    </>
  );
}

interface AccountUserProps {
  codename: string;
  email: string;
  firstName: string;
  lastname: string | undefined;
  dob: string | undefined;
  editInfo?: () => void;
  editPersonal?: () => void;
}
