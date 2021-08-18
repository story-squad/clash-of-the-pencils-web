import { Meta, Story } from '@storybook/react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import DashboardTemplate from './DashboardTemplate';
import { IDashboardTemplateProps } from './DashboardTemplate.model';

const Template: Story<PropsWithChildren<IDashboardTemplateProps>> = (props) => (
  <RecoilRoot>
    <DashboardTemplate {...props} />
  </RecoilRoot>
);

const Content = (): ReactElement => {
  const paragraph = (
    <p
      style={{
        fontSize: '1.6rem',
        lineHeight: '2.4rem',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      Adipisicing amet occaecat in velit est ut amet aliquip quis eiusmod anim.
      Sunt veniam eiusmod exercitation aliqua consequat ullamco aliqua
      adipisicing. Ex nisi incididunt exercitation enim aliqua voluptate qui.
      Ipsum officia non occaecat et in deserunt ex quis sint adipisicing labore
      Lorem dolor. Lorem deserunt mollit qui et esse velit eu consectetur. Qui
      non duis esse sint.
    </p>
  );
  return (
    <>
      {paragraph}
      {paragraph}
      {paragraph}
      {paragraph}
      {paragraph}
      {paragraph}
      {paragraph}
      {paragraph}
    </>
  );
};

export const Default = Template.bind({});
Default.argTypes = {};

export const WithContent = Template.bind({});
WithContent.args = {
  children: <Content />,
};

export default {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
