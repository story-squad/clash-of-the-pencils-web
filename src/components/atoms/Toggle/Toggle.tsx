import React from 'react';
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
  return <div className="toggle"></div>;
}
