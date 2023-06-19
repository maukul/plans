import { differenceInCalendarISOWeeks, setDay } from 'date-fns';

export function getFridaySundayWeek(dateWeek: Date): Date[] {
  return [setDay(dateWeek, 4), setDay(dateWeek, 0)];
}

export function getWeekNumber(dateWeek: Date): number {
  return differenceInCalendarISOWeeks(dateWeek, new Date(2020, 0, 0));
}
