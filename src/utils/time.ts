import { utcToZonedTime } from 'date-fns-tz';

export const time = {
  inSeconds: {
    minute: {
      one: 60,
      five: 300,
    },
  },
  inMilliseconds: {
    seconds: {
      fifteen: 15000,
    },
  },
};

export const getLocalDate = (date: Date) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return utcToZonedTime(date, tz);
};
