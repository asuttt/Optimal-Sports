import {sanityClient} from '@/lib/sanity/client';
import {resolveSanityHexColor, type SanityHexColor} from '@/lib/colorUtils';

export interface ScheduleLineItem {
  classTitle: string;
  instructor: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isCancelled?: boolean;
  isSubstitute?: boolean;
}

export interface SchedulePageContent {
  displayStartHour: number;
  displayEndHour: number;
  scheduleBackgroundColor: string;
  todayTabColor: string;
  todayTabFillColor: string;
  classTabColor: string;
  classTabFillColor: string;
  cancelledClassTabColor: string;
  cancelledClassFillColor: string;
  substituteClassTabColor: string;
  substituteClassFillColor: string;
  monday: ScheduleLineItem[];
  tuesday: ScheduleLineItem[];
  wednesday: ScheduleLineItem[];
  thursday: ScheduleLineItem[];
  friday: ScheduleLineItem[];
  saturday: ScheduleLineItem[];
  sunday: ScheduleLineItem[];
}

export const DEFAULT_SCHEDULE_PAGE_CONTENT: SchedulePageContent = {
  displayStartHour: 7,
  displayEndHour: 20,
  scheduleBackgroundColor: '#EFEFEF',
  todayTabColor: '#236A52',
  todayTabFillColor: '#DDEBE5',
  classTabColor: '#6E6252',
  classTabFillColor: '#F5F2EC',
  cancelledClassTabColor: '#DC2626',
  cancelledClassFillColor: '#FEF1F1',
  substituteClassTabColor: '#6E6252',
  substituteClassFillColor: '#EEE7DD',
  monday: [
    { classTitle: 'Strength Foundations', instructor: 'Coach TBU', startTime: '07:00', endTime: '08:00' },
    { classTitle: 'Midday Conditioning', instructor: 'Coach TBU', startTime: '12:00', endTime: '13:00' },
    { classTitle: 'Evening Flow', instructor: 'Coach TBU', startTime: '18:00', endTime: '19:00' },
  ],
  tuesday: [],
  wednesday: [
    { classTitle: 'Mobility Reset', instructor: 'Coach TBU', startTime: '07:30', endTime: '08:15' },
    { classTitle: 'Full Body Circuit', instructor: 'Coach TBU', startTime: '17:30', endTime: '18:30' },
  ],
  thursday: [],
  friday: [
    { classTitle: 'Lower Body Strength', instructor: 'Coach TBU', startTime: '07:00', endTime: '08:00' },
    { classTitle: 'Express Core', instructor: 'Coach TBU', startTime: '12:15', endTime: '13:00' },
    { classTitle: 'Friday Sweat', instructor: 'Coach TBU', startTime: '17:30', endTime: '18:30' },
  ],
  saturday: [],
  sunday: [
    { classTitle: 'Community Lift', instructor: 'Coach TBU', startTime: '09:00', endTime: '10:00' },
    { classTitle: 'Mobility Reset', instructor: 'Coach TBU', startTime: '10:30', endTime: '11:15' },
  ],
}

interface SchedulePageSanityRaw {
  displayStartTime?: string;
  displayEndTime?: string;
  scheduleBackgroundColor?: SanityHexColor;
  todayTabColor?: SanityHexColor;
  todayTabFillColor?: SanityHexColor;
  classTabColor?: SanityHexColor;
  classTabFillColor?: SanityHexColor;
  cancelledClassTabColor?: SanityHexColor;
  cancelledClassFillColor?: SanityHexColor;
  substituteClassTabColor?: SanityHexColor;
  substituteClassFillColor?: SanityHexColor;
  monday?: Partial<ScheduleLineItem>[];
  tuesday?: Partial<ScheduleLineItem>[];
  wednesday?: Partial<ScheduleLineItem>[];
  thursday?: Partial<ScheduleLineItem>[];
  friday?: Partial<ScheduleLineItem>[];
  saturday?: Partial<ScheduleLineItem>[];
  sunday?: Partial<ScheduleLineItem>[];
}

const TIME_INPUT_PATTERN = /^([01]\d|2[0-3]):?([0-5]\d)$/;

function toCanonicalTime(value: string) {
  const match = value.trim().match(TIME_INPUT_PATTERN);
  if (!match) return null;

  const hour = match[1];
  const minute = match[2];
  return `${hour}:${minute}`;
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}

function toHour(value: string) {
  const [hour] = value.split(':').map(Number);
  return hour;
}

const SCHEDULE_PAGE_QUERY = `
  *[_type == "schedulePage" && _id == "schedulePage"][0]{
    displayStartTime,
    displayEndTime,
    scheduleBackgroundColor,
    todayTabColor,
    todayTabFillColor,
    classTabColor,
    classTabFillColor,
    cancelledClassTabColor,
    cancelledClassFillColor,
    substituteClassTabColor,
    substituteClassFillColor,
    monday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    tuesday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    wednesday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    thursday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    friday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    saturday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute},
    sunday[]{classTitle, instructor, startTime, endTime, isCancelled, isSubstitute}
  }
`;

function normalizeLineItems(items: Partial<ScheduleLineItem>[] | undefined): ScheduleLineItem[] {
  return (items ?? []).flatMap((item) => {
    const classTitle = item.classTitle?.trim() ?? '';
    const instructor = item.instructor?.trim() ?? '';
    const rawStartTime = item.startTime?.trim() ?? '';
    const rawEndTime = item.endTime?.trim() ?? '';
    const startTime = toCanonicalTime(rawStartTime);
    const endTime = toCanonicalTime(rawEndTime);

    if (!classTitle || !instructor) return [];
    if (!startTime || !endTime) return [];
    if (toMinutes(endTime) <= toMinutes(startTime)) return [];

    return [{
      classTitle,
      instructor,
      startTime,
      endTime,
      isCancelled: Boolean(item.isCancelled),
      isSubstitute: Boolean(item.isSubstitute),
    }];
  });
}

export async function fetchSchedulePageContent(): Promise<SchedulePageContent | null> {
  if (!sanityClient) return null;

  const raw = await sanityClient.fetch<SchedulePageSanityRaw | null>(SCHEDULE_PAGE_QUERY);
  if (!raw) return null;

  const startTime = raw.displayStartTime ? toCanonicalTime(raw.displayStartTime) : null;
  const endTime = raw.displayEndTime ? toCanonicalTime(raw.displayEndTime) : null;
  const startHour = startTime && startTime.endsWith(':00') ? toHour(startTime) : 7;
  const parsedEndHour = endTime && endTime.endsWith(':00') ? toHour(endTime) : 20;
  const endHour = parsedEndHour > startHour ? parsedEndHour : Math.min(startHour + 1, 24);

  return {
    displayStartHour: startHour,
    displayEndHour: endHour,
    scheduleBackgroundColor: resolveSanityHexColor(raw.scheduleBackgroundColor, DEFAULT_SCHEDULE_PAGE_CONTENT.scheduleBackgroundColor),
    todayTabColor: resolveSanityHexColor(raw.todayTabColor, DEFAULT_SCHEDULE_PAGE_CONTENT.todayTabColor),
    todayTabFillColor: resolveSanityHexColor(raw.todayTabFillColor, DEFAULT_SCHEDULE_PAGE_CONTENT.todayTabFillColor),
    classTabColor: resolveSanityHexColor(raw.classTabColor, DEFAULT_SCHEDULE_PAGE_CONTENT.classTabColor),
    classTabFillColor: resolveSanityHexColor(raw.classTabFillColor, DEFAULT_SCHEDULE_PAGE_CONTENT.classTabFillColor),
    cancelledClassTabColor: resolveSanityHexColor(raw.cancelledClassTabColor, DEFAULT_SCHEDULE_PAGE_CONTENT.cancelledClassTabColor),
    cancelledClassFillColor: resolveSanityHexColor(raw.cancelledClassFillColor, DEFAULT_SCHEDULE_PAGE_CONTENT.cancelledClassFillColor),
    substituteClassTabColor: resolveSanityHexColor(raw.substituteClassTabColor, DEFAULT_SCHEDULE_PAGE_CONTENT.substituteClassTabColor),
    substituteClassFillColor: resolveSanityHexColor(raw.substituteClassFillColor, DEFAULT_SCHEDULE_PAGE_CONTENT.substituteClassFillColor),
    monday: normalizeLineItems(raw.monday),
    tuesday: normalizeLineItems(raw.tuesday),
    wednesday: normalizeLineItems(raw.wednesday),
    thursday: normalizeLineItems(raw.thursday),
    friday: normalizeLineItems(raw.friday),
    saturday: normalizeLineItems(raw.saturday),
    sunday: normalizeLineItems(raw.sunday),
  };
}
