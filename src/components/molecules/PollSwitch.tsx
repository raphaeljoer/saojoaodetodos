//core-components
import Poll from '@/components/molecules/Poll';
import Closed from '@/components/molecules/Closed';
import Winner from '@/components/molecules/Winner';
//resources
import React, { useCallback, useEffect, useState } from 'react';
import { isBetween } from '@/utils/date';
//data
import artists from '@/data/static/artists';
//config
import { checkTime, date } from '@/config/poll';
//types
import { ResultProps } from '@/@types/result';

type IStatus = 'open' | 'closed' | 'winner';
type IDisplay = { [key in IStatus]: JSX.Element };
type PollSwitchProps = { results: ResultProps[] };

export const PollSwitch = ({
  results,
}: PollSwitchProps): JSX.Element | null => {
  const [status, setStatus] = useState<IStatus | null>(null);

  const updateStatus = useCallback(() => {
    new Map<IStatus, boolean>([
      ['open', isBetween(date.open.start, date.open.end)],
      ['closed', isBetween(date.closed.start, date.closed.end)],
      ['winner', isBetween(date.winner.start, date.winner.end)],
    ]).forEach((v, k) => v && setStatus(k));
  }, []);

  const display: IDisplay = {
    open: <Poll artists={artists} results={results} />,
    closed: <Closed />,
    winner: <Winner results={results} />,
  };

  useEffect(() => {
    updateStatus();
    const checkStatus = setInterval(updateStatus, checkTime);
    return () => clearInterval(checkStatus);
  }, [updateStatus]);

  return status ? display[status] : null;
};

export default PollSwitch;
