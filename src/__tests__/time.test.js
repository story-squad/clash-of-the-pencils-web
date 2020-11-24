import { time } from '../utils';
import moment from 'moment';

describe('time module testing', () => {
  describe('getTimeUntilEvent()', () => {
    const now = moment.utc('01:00:00.0', 'HH:mm:ss.S');
    it('returns 2h30m until sub at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('submit', now);
      expect(timeUntil.format('HH:mm')).toBe('02:30');
      expect(active).toBe(false);
    });
    it('returns 19h30m until voting start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('vote', now);
      expect(timeUntil.format('HH:mm')).toBe('19:30');
      expect(active).toBe(false);
    });
    it('returns 22h until stream start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('stream', now);
      expect(timeUntil.format('HH:mm')).toBe('22:00');
      expect(active).toBe(false);
    });
  });
});
