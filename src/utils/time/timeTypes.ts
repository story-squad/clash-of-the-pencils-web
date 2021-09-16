/* Important Time Module Types */

/**
 * The `nametags` for time-based events we track using union syntax
 */
export type eventType = 'submit' | 'vote' | 'stream' | 'admin' | 'off';
export enum ClashPhases {
  submit = 'submit',
  vote = 'vote',
  stream = 'stream',
  admin = 'admin',
  off = 'off',
}

/**
 * An interface for a seconds value converted into hours, minutes, seconds
 *
 * ex: `{ h, m, s }`
 */
export interface TimeUntilItem {
  h: number;
  m: number;
  s: number;
}
export function isTimeUntilItem(item: unknown): item is TimeUntilItem {
  const itemAs = item as TimeUntilItem;
  return (
    itemAs !== undefined &&
    typeof itemAs === 'object' &&
    typeof itemAs.h === 'number' &&
    typeof itemAs.m === 'number' &&
    typeof itemAs.s === 'number'
  );
}

export interface ICurrentTime {
  phase: ClashPhases & string;
  timeLeft: number;
}
