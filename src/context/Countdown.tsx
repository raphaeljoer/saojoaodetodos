import { createContext, ReactNode, useEffect, useState } from "react";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  resetCountdown: () => void;
  startCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      //inicie algo
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <CountdownContext.Provider value={{
      isActive,
      resetCountdown,
      hasFinished,
      startCountdown,
      minutes,
      seconds,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}