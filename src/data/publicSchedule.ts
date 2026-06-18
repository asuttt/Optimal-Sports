export const PUBLIC_SCHEDULE_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type PublicScheduleDay = (typeof PUBLIC_SCHEDULE_DAYS)[number];

export interface PublicScheduleSession {
  id: string;
  day: PublicScheduleDay;
  startDateTime: string;
  durationMinutes: number;
  name: string;
  instructor: string;
  isCancelled?: boolean;
  isSubstitute?: boolean;
  substituteInstructor?: string;
}
