import React from 'react';
import { Users } from '../../../api';
import { Leaderboard, Prompt, TwoColumn } from '../../organisms';
import { DashboardTemplate } from '../../templates';

export interface ISubmissionViewProps {
  user?: Users.IUser;
}

export default function SubmissionView({}: ISubmissionViewProps): React.ReactElement {
  return (
    <DashboardTemplate>
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
    </DashboardTemplate>
  );
}
