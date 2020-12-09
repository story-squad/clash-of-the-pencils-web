import moment from 'moment';
import { time } from '../utils';

describe('time module testing', () => {
  describe('getTimeUntilEvent()', () => {
    const now = moment.utc('01:00:00.0', 'HH:mm:ss.S');
    it('returns 0h30m until sub start when passed in 1am utc', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('submit', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns 0h30m until voting ends when passed in 1am utc', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('vote', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(true);
    });
    it('returns 0h30m until stream end (active!) when passed in 1am utc', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('stream', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(true);
    });
    it('returns 0h30m until results are available when passed in 1am utc', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('announce', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns time until end (17h) when passed in a time during an event', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('submit', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(active).toBe(true);
      expect(formattedTime.h).toBe(17);
    });
    it('returns 17h time until announcements end from 9pm pst', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('announce', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(17);
      expect(formattedTime.m).toBe(0);
      expect(active).toBe(true);
    });
    it('returns 2h until annoucements end from 12pm pst', () => {
      const cur = moment.utc('20:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('announce', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(2);
      expect(formattedTime.m).toBe(0);
      expect(active).toBe(true);
    });
    it('returns (true, false) in active for (vote, submit) at midnight utc', () => {
      const cur = moment.utc('0:00:00.0', 'HH:mm:ss.S');

      const { active: subActive } = time.getTimeUntilEvent('submit', cur);
      const { active: voteActive } = time.getTimeUntilEvent('vote', cur);

      expect(subActive).toBe(false);
      expect(voteActive).toBe(true);
    });
  });
});
