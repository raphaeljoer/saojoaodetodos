import { useContext } from 'react';

import { VoteContext } from '@/context/Vote';

const CountDown = () => {
  const { countDown } = useContext(VoteContext);
  return <span>00:{`0${countDown}`.slice(-2)}</span>;
};

export default CountDown;
