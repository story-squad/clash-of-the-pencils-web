import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { app } from '../../../state';
import { Card, Picture, Sticker } from '../../atoms';
import './styles/index.scss';
import { SubmissionCardProps } from './types';

export default function SubmissionCard({
  submission,
  containerProps: { onClick, className, ...containerProps } = {},
  disablePreview,
}: SubmissionCardProps): React.ReactElement {
  const openAnImageFullscreen = useSetRecoilState(app.imageView.openImage);
  const openSubmission = () => {
    openAnImageFullscreen({
      description: submission.prompt,
      source: submission.src,
      rotation: submission.rotation,
    });
  };
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e);
    if (!disablePreview) openSubmission();
  };

  // const age = useMemo(
  //   () =>
  //     Math.abs(
  //       Math.round(
  //         DateTime.fromISO(submission.dob as string).diffNow('years').years,
  //       ),
  //     ),
  //   [submission.dob],
  // );

  return (
    <Card
      className={classnames('submission-card', className)}
      onClick={clickHandler}
      {...containerProps}
    >
      <Picture
        source={submission.src}
        description={`Hand-written story submitted by ${submission.codename}`}
        rotation={submission.rotation}
        disablePreview={disablePreview}
      />
      <div className="submission-card-footer">
        <div className="content-left">
          <h2>{submission.codename}</h2>
          {/* <h3>Age: {age > 18 ? '18+' : age}</h3> */}
        </div>
        <Sticker type="readMe" className="read-me" />
      </div>
    </Card>
  );
}
