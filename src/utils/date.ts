import { isAfter, isBefore } from 'date-fns';

export const isBetween = (start: Date, end: Date): boolean => {
  const currentDate = new Date();
  return isAfter(currentDate, start) && isBefore(currentDate, end);
};
