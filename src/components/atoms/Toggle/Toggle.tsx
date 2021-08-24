import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';
import { ToggleOption } from './Toggle.model';

export interface IToggleProps {
  /**
   * It's important here to make sure that you're passing in
   * the proper boolean state value that's keeping track of
   * whichever option is being rendered on the LEFT side.
   *
   * So, if the `Toggle` looks like this:
   *
   * `( [Dashboard]  Profile )`
   *
   * the `leftIsSelected` props should be passed `isDashboard`,
   * NOT `isProfile`.
   */
  leftIsSelected: boolean;
  options: ToggleOption[];
  toggle: () => void;
}

export default function Toggle({
  options,
  leftIsSelected,
  toggle,
}: IToggleProps): React.ReactElement {
  return (
    <div className="toggle">
      <div
        className={classnames('toggle-block', leftIsSelected && 'leftSelected')}
      />
      <div className="toggle-items">
        <div
          className={classnames(
            'toggle-item toggle-left',
            leftIsSelected && 'selected',
          )}
          onClick={options[0].onSelect ?? toggle}
        >
          {options[0].text}
        </div>
        <div
          className={classnames(
            'toggle-item toggle-right',
            !leftIsSelected && 'selected',
          )}
          onClick={options[1].onSelect ?? toggle}
        >
          {options[1].text}
        </div>
      </div>
    </div>
  );
}
