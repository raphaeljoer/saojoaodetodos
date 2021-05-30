/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, useState, useEffect, SetStateAction } from 'react';
import { addSeconds, differenceInSeconds, isAfter, isBefore } from 'date-fns';

import CountDown from '@/components/atoms/CountDown';

interface VoteContextProps {
  isAvailable: boolean;
  setIsAvailable: Dispatch<boolean>;

  isVoting: boolean;
  setIsVoting: Dispatch<SetStateAction<boolean>>;

  choice: string;
  setChoice: Dispatch<string>;

  lastVoteDate: Date;
  setLastVoteDate: Dispatch<Date>;

  dateToAvailable: Date;
  setDateToAvailable: Dispatch<Date>;

  countDown: number;
  setCountDown: Dispatch<number>;

  CountDown: (time: any) => JSX.Element;

  setLastVoteDateToStorage: Dispatch<void>;

  handleAvailability: () => void;
}

const VoteContext = createContext<VoteContextProps>({} as VoteContextProps);

const VoteProvider = ({ children }: any) => {
  const [isVoting, setIsVoting] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [choice, setChoice] = useState('');
  const [countDown, setCountDown] = useState(0);
  const [lastVoteDate, setLastVoteDate] = useState(new Date());
  const [dateToAvailable, setDateToAvailable] = useState(new Date());

  const setLastVoteDateToStorage = () => {
    localStorage.setItem('@SaoJoaoDeTodos:LastVoteDate', String(new Date()));
  };

  const getDateToAvailable = () => {
    const storageDate = localStorage.getItem('@SaoJoaoDeTodos:LastVoteDate');
    const date = new Date(storageDate || '');
    const availableDate = addSeconds(date, 60);
    setDateToAvailable(availableDate);
    return availableDate;
  };

  const handleAvailability = () => {
    if (isBefore(Date.now(), getDateToAvailable())) {
      countDown <= 0 &&
        setCountDown(differenceInSeconds(getDateToAvailable(), new Date()));
    }

    if (isAfter(Date.now(), getDateToAvailable())) {
      setIsAvailable(true);
    }
  };

  useEffect(() => {
    const callTick = setInterval(handleAvailability, 1000);

    if (isAfter(Date.now(), getDateToAvailable())) {
      clearInterval(callTick);
    }

    if (isAvailable) {
      clearInterval(callTick);
    }

    return () => clearInterval(callTick);
  }, [isAvailable]);

  useEffect(() => {
    if (isBefore(Date.now(), getDateToAvailable())) {
      setIsAvailable(false);
    }
  }, []);

  return (
    <VoteContext.Provider
      value={{
        isAvailable,
        setIsAvailable,

        isVoting,
        setIsVoting,

        choice,
        setChoice,

        lastVoteDate,
        setLastVoteDate,

        dateToAvailable,
        setDateToAvailable,

        countDown,
        setCountDown,
        CountDown,

        handleAvailability,

        setLastVoteDateToStorage,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export { VoteContext, VoteProvider };
