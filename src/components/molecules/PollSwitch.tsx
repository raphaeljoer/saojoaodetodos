//core-components
import Poll from '@/components/molecules/Poll';
import Closed from '@/components/molecules/Closed';
import Winner from '@/components/molecules/Winner';
//resources
import React, { useCallback, useEffect, useState } from 'react';
import { isBetween } from '@/utils/date';
//data
import artists from '@/data/static/artists';
//types
import { IDisplayPoll, IPollConfig, IPollStatus } from '@/@Entities/poll';

type PollSwitchProps = { config: IPollConfig };

export const PollSwitch = ({ config }: PollSwitchProps): JSX.Element | null => {
  const { date, checkTime, results, status } = config;
  const [state, setState] = useState<IPollStatus | null>(null);

  const updateState = useCallback(() => {
    status.forEach((s) => isBetween(date[s].start, date[s].end) && setState(s));
  }, [status]);

  const displayPoll: IDisplayPoll = {
    open: <Poll artists={artists} results={results} />,
    closed: <Closed />,
    winner: <Winner results={results} />,
  };

  useEffect(() => {
    updateState();
    const checkStatus = setInterval(updateState, checkTime);
    return () => clearInterval(checkStatus);
  }, [updateState]);

  return state && displayPoll[state];
};

export default PollSwitch;
