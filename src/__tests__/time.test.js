import { time } from '../utils';
import moment from 'moment';

describe('time module testing', () => {
  describe('getTimeUntilEvent()', () => {
    const now = moment.utc('01:00:00.0', 'HH:mm:ss.S');
    it('returns 2h30m until sub at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('submit', now);
      expect(timeUntil).toBe(2 * 60 * 60 + 30 * 60);
      expect(active).toBe(false);
    });
    it('returns 19h30m until voting start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('vote', now);
      expect(timeUntil).toBe(19 * 60 * 60 + 30 * 60);
      expect(active).toBe(false);
    });
    it('returns 22h until stream start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('stream', now);
      expect(timeUntil).toBe(22 * 60 * 60);
      expect(active).toBe(false);
    });
    it('returns time until end (15h) when passed in a time during an event', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('submit', cur);
      expect(timeUntil).toBe(15 * 60 * 60);
      expect(active).toBe(true);
    });
  });
});
