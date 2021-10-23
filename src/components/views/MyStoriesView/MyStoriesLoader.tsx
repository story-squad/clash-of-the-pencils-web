import React from 'react';
import { DragonLoader } from '../../molecules';
import { DashboardTemplate } from '../../templates';

export default function MyStoriesLoader(): React.ReactElement {
  return (
    <DashboardTemplate>
      <DragonLoader className="my-stories-view-loader" />
    </DashboardTemplate>
  );
}
