import { Meta } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../data';
import { DragonBank } from '../molecules';
import SubmissionCard from '../molecules/SubmissionCard/SubmissionCard';
import { VotingDragAndDropContext } from '../providers';
import FullscreenImageOverlayContainer from '../views/FullscreenImageOverlay/FullscreenImageOverlayContainer';

const Template = (): React.ReactElement => {
  return (
    <>
      <DragonBank />
      <div>
        <SubmissionCard submission={submissionData[0]} position={1} />
        <SubmissionCard submission={submissionData[1]} position={2} />
        <SubmissionCard submission={submissionData[2]} position={3} />
      </div>
    </>
  );
};

export const Default = Template.bind({});

export default {
  title: 'Sandboxes/VotingDragAndDrop',
  decorators: [
    (story) => (
      <RecoilRoot>
        <VotingDragAndDropContext>
          {story()}
          <FullscreenImageOverlayContainer />
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
