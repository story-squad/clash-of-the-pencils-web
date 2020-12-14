import { Moment } from 'moment';
/* Important Time Module Types */
/**
 * The `nametags` for time-based events we track using union syntax
 */
export type eventType = 'submit' | 'vote' | 'stream' | 'announce' | 'offTime';

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

/**
 * A type for the larger schedule object on which we track time-based events
 */
export type scheduleObjectType = {
  [key in eventType]: {
    start: Moment;
    end: Moment;
  };
};
