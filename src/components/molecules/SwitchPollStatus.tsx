//core-components
import Poll from '@/components/molecules/Poll';
import Closed from '@/components/molecules/Closed';
import Winner from '@/components/molecules/Winner';
//resources
import React, { useEffect, useState } from 'react';
import { isBetween } from '@/utils/date';
//data
import artists from '@/data/static/artists';
//types
import { ResultProps } from '@/@types/result';
import { checkTime, date } from '@/config/poll';

interface SwitchPollStatusProps {
  results: ResultProps[];
}

export const SwitchPollStatus = ({
  results,
}: SwitchPollStatusProps): JSX.Element | null => {
  const [status, setStatus] = useState<string | null>(null);

  const updateStatus = () => {
    const status = {
      open: isBetween(date.open.start, date.open.end),
      closed: isBetween(date.closed.start, date.closed.end),
      winner: isBetween(date.winner.start, date.winner.end),
    };

    Object.entries(status).forEach((s) => s[1] && setStatus(s[0]));
  };

  const display: { [key: string]: JSX.Element } = {
    open: <Poll artists={artists} results={results} />,
    closed: <Closed />,
    winner: <Winner results={results} />,
  };

  useEffect(() => {
    updateStatus();
    const checkStatus = setInterval(updateStatus, checkTime);
    return () => clearInterval(checkStatus);
  }, []);

  return status ? display[status] : null;
};

export default SwitchPollStatus;
