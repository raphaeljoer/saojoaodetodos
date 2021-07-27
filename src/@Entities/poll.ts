import { ResultProps } from '@/@Entities/result';

export type IPollStatus = 'open' | 'closed' | 'winner';

export type IDisplayPoll = { [key in IPollStatus]: JSX.Element };

export type IPollDate = {
  [key in IPollStatus]: {
    start: Date;
    end: Date;
  };
};

export type IPollConfig = {
  date: IPollDate;
  checkTime: number;
  results: ResultProps[];
  status: IPollStatus[];
};
