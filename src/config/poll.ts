import { IPollDate, IPollStatus } from '@/@Entities/poll';

export const checkTime = 60000;

export const status: IPollStatus[] = ['open', 'closed', 'winner'];

export const date: IPollDate = {
  open: {
    start: new Date('2021-05-06T20:00:00'),
    end: new Date('2031-05-18T23:59:59'),
  },
  closed: {
    start: new Date('2031-05-18T00:00:00'),
    end: new Date('2031-05-19T23:59:59'),
  },
  winner: {
    start: new Date('2031-05-19T00:00:00'),
    end: new Date('2131-05-19T00:00:00'),
  },
};
