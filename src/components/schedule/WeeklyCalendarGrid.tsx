import { Fragment, useEffect, useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import { PUBLIC_SCHEDULE_DAYS, type PublicScheduleSession } from '@/data/publicSchedule';
import { withHexAlpha } from '@/lib/colorUtils';
import { getNowInTimeZone, toDateKeyInTimeZone } from '@/lib/timeZone';
import { cn } from '@/lib/utils';

interface WeeklyCalendarGridProps {
  weekStart: Date;
  sessionsByDay: Record<string, PublicScheduleSession[]>;
  scheduleStartHour: number;
  scheduleEndHour: number;
  scheduleTheme: {
    scheduleBackgroundColor: string;
    todayTabColor: string;
    todayTabFillColor: string;
    classTabColor: string;
    classTabFillColor: string;
    cancelledClassTabColor: string;
    cancelledClassFillColor: string;
    substituteClassTabColor: string;
    substituteClassFillColor: string;
  };
}

const HOUR_HEIGHT_PX = 50;
const EMPTY_HOUR_HEIGHT_PX = 25;
const MIN_EVENT_HEIGHT_PX = 28;
const GYM_TIME_ZONE = 'America/New_York';
const MINUTES_PER_HOUR = 60;

function toMinutesSinceMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function formatHourLabel(hour: number) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized} ${period}`;
}

function formatEventTimeRange(start: Date, durationMinutes: number) {
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
}

function getSessionCardStyle(
  session: PublicScheduleSession,
  isTodayColumn: boolean,
  isPastColumn: boolean,
  scheduleTheme: WeeklyCalendarGridProps['scheduleTheme']
) {
  const substituteLabel = session.instructor.length > 12 ? '[SUB]' : '[SUBSTITUTE]';

  if (session.isCancelled) {
    if (isPastColumn) {
      return {
        backgroundColor: scheduleTheme.classTabFillColor,
        borderColor: '#DFDFDF',
        borderLeftColor: scheduleTheme.cancelledClassTabColor,
        boxShadow: '0 1px 2px rgba(17, 24, 39, 0.08)',
        transform: undefined,
        zIndex: 3,
        titleClassName: 'text-foreground',
        metaClassName: 'text-foreground/90',
        badge: '[CANCELLED]',
        badgeClassName: '',
        badgeStyle: { color: scheduleTheme.cancelledClassTabColor },
      };
    }

    return {
      backgroundColor: scheduleTheme.cancelledClassFillColor,
      borderColor: withHexAlpha(scheduleTheme.cancelledClassTabColor, 0.35, 'rgba(220, 38, 38, 0.35)'),
      borderLeftColor: scheduleTheme.cancelledClassTabColor,
      boxShadow: `0 1px 2px ${withHexAlpha(scheduleTheme.cancelledClassTabColor, 0.12, 'rgba(127, 29, 29, 0.12)')}`,
      transform: undefined,
      zIndex: 3,
      titleClassName: 'text-foreground',
      metaClassName: 'text-foreground/90',
      badge: '[CANCELLED]',
      badgeClassName: '',
      badgeStyle: { color: scheduleTheme.cancelledClassTabColor },
    };
  }

  if (session.isSubstitute || session.substituteInstructor) {
    if (isPastColumn) {
      return {
        backgroundColor: scheduleTheme.classTabFillColor,
        borderColor: '#DFDFDF',
        borderLeftColor: scheduleTheme.substituteClassTabColor,
        boxShadow: '0 1px 2px rgba(17, 24, 39, 0.08)',
        transform: undefined,
        zIndex: 3,
        titleClassName: 'text-foreground',
        metaClassName: 'text-foreground/90',
        badge: substituteLabel,
        badgeClassName: '',
        badgeStyle: { color: scheduleTheme.substituteClassTabColor },
      };
    }

    return {
      backgroundColor: scheduleTheme.substituteClassFillColor,
      borderColor: withHexAlpha(scheduleTheme.substituteClassTabColor, 0.2, 'rgba(75, 58, 168, 0.2)'),
      borderLeftColor: scheduleTheme.substituteClassTabColor,
      boxShadow: `0 1px 2px ${withHexAlpha(scheduleTheme.substituteClassTabColor, 0.08, 'rgba(75, 58, 168, 0.08)')}`,
      transform: undefined,
      zIndex: 3,
      titleClassName: 'text-foreground',
      metaClassName: 'text-foreground/90',
      badge: substituteLabel,
      badgeClassName: '',
      badgeStyle: { color: scheduleTheme.substituteClassTabColor },
    };
  }

  return {
    backgroundColor: isTodayColumn ? scheduleTheme.todayTabFillColor : scheduleTheme.classTabFillColor,
    borderColor: '#DFDFDF',
    borderLeftColor: isTodayColumn ? scheduleTheme.todayTabColor : scheduleTheme.classTabColor,
    boxShadow: isTodayColumn
      ? '0 4px 10px rgba(36, 52, 19, 0.22)'
      : '0 1px 2px rgba(17, 24, 39, 0.08)',
    transform: isTodayColumn ? 'scale(1.01)' : undefined,
    zIndex: isTodayColumn ? 2 : 1,
    titleClassName: 'text-foreground',
    metaClassName: 'text-foreground/90',
    badge: null,
    badgeClassName: '',
    badgeStyle: undefined,
  };
}

export default function WeeklyCalendarGrid({
  weekStart,
  sessionsByDay,
  scheduleStartHour,
  scheduleEndHour,
  scheduleTheme,
}: WeeklyCalendarGridProps) {
  const dayColumns = [...PUBLIC_SCHEDULE_DAYS];
  const [nowInGymTimeZone, setNowInGymTimeZone] = useState(() => getNowInTimeZone(GYM_TIME_ZONE));
  const todayInGymTimeZone = toDateKeyInTimeZone(nowInGymTimeZone, GYM_TIME_ZONE);
  const nowMinutesSinceMidnight = toMinutesSinceMidnight(nowInGymTimeZone);
  const minScheduleMinutes = scheduleStartHour * MINUTES_PER_HOUR;
  const maxScheduleMinutes = scheduleEndHour * MINUTES_PER_HOUR;
  const hours = useMemo(
    () => Array.from({ length: scheduleEndHour - scheduleStartHour }, (_, index) => scheduleStartHour + index),
    [scheduleStartHour, scheduleEndHour]
  );
  const allSessions = useMemo(() => Object.values(sessionsByDay).flat(), [sessionsByDay]);
  const hourBaseHeights = useMemo(() => (
    hours.map((hour) => {
      const slotStartMinutes = hour * 60;
      const slotEndMinutes = (hour + 1) * MINUTES_PER_HOUR;
      const hasAnySession = allSessions.some((session) => {
        const sessionStartMinutes = toMinutesSinceMidnight(new Date(session.startDateTime));
        const sessionEndMinutes = sessionStartMinutes + session.durationMinutes;
        return sessionStartMinutes < slotEndMinutes && sessionEndMinutes > slotStartMinutes;
      });
      return hasAnySession ? HOUR_HEIGHT_PX : EMPTY_HOUR_HEIGHT_PX;
    })
  ), [allSessions, hours]);

  const { rowHeights, rowOffsets, totalHeight } = useMemo(() => {
    const offsets: number[] = [];
    let runningOffset = 0;

    hourBaseHeights.forEach((height) => {
      offsets.push(runningOffset);
      runningOffset += height;
    });

    return {
      rowHeights: hourBaseHeights,
      rowOffsets: offsets,
      totalHeight: runningOffset,
    };
  }, [hourBaseHeights]);

  const toVerticalOffset = (minutesSinceMidnight: number) => {
    const minMinutes = scheduleStartHour * MINUTES_PER_HOUR;
    const maxMinutes = scheduleEndHour * MINUTES_PER_HOUR;
    const clampedMinutes = Math.max(minMinutes, Math.min(maxMinutes, minutesSinceMidnight));
    if (clampedMinutes === maxMinutes) return totalHeight;

    const minuteOffsetFromStart = clampedMinutes - minMinutes;
    const hourIndex = Math.min(
      rowHeights.length - 1,
      Math.max(0, Math.floor(minuteOffsetFromStart / MINUTES_PER_HOUR))
    );
    const minuteWithinHour = minuteOffsetFromStart % MINUTES_PER_HOUR;
    const rowHeight = rowHeights[hourIndex] ?? HOUR_HEIGHT_PX;
    const rowOffset = rowOffsets[hourIndex] ?? 0;

    return rowOffset + (minuteWithinHour / MINUTES_PER_HOUR) * rowHeight;
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNowInGymTimeZone(getNowInTimeZone(GYM_TIME_ZONE));
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const shouldShowCurrentTimeLine = nowMinutesSinceMidnight >= minScheduleMinutes && nowMinutesSinceMidnight <= maxScheduleMinutes;
  const currentTimeLineTop = shouldShowCurrentTimeLine ? toVerticalOffset(nowMinutesSinceMidnight) : 0;
  const todayColumnTint = withHexAlpha(scheduleTheme.todayTabFillColor, 0.22, 'rgba(116, 155, 38, 0.04)');

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border/70 shadow-sm"
      style={{ backgroundColor: scheduleTheme.scheduleBackgroundColor }}
    >
      <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] border-b border-border/80">
        <div />
        {dayColumns.map((dayName, index) => {
          const dayDate = addDays(weekStart, index);
          const isToday = toDateKeyInTimeZone(dayDate, GYM_TIME_ZONE) === todayInGymTimeZone;
          return (
            <div
              key={dayName}
              className="border-l border-border/80 px-3 py-2 text-center"
              style={isToday ? { backgroundColor: todayColumnTint } : undefined}
            >
              <p
                className={`text-xs font-semibold tracking-wide ${isToday ? '' : 'text-foreground/75'}`}
                style={isToday ? { color: scheduleTheme.todayTabColor } : undefined}
              >
                {format(dayDate, 'EEE').toUpperCase()}
              </p>
              <p
                className={`mt-1 text-2xl font-semibold ${isToday ? '' : 'text-foreground'}`}
                style={isToday ? { color: scheduleTheme.todayTabColor } : undefined}
              >
                {format(dayDate, 'd')}
              </p>
            </div>
          );
        })}
      </div>

      <div className="relative" style={{ height: `${totalHeight}px` }}>
        <div
          className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))]"
          style={{ gridTemplateRows: rowHeights.map((height) => `${height}px`).join(' ') }}
        >
          {hours.map((hour) => (
            <Fragment key={hour}>
              <div className="border-t border-border/70 pr-2 pt-0.5 text-right text-xs font-semibold text-foreground/60">
                {formatHourLabel(hour)}
              </div>
              {dayColumns.map((dayName) => (
                <div key={`${dayName}-${hour}`} className="border-l border-t border-border/70" />
              ))}
            </Fragment>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 grid grid-cols-[72px_repeat(7,minmax(0,1fr))]">
          <div />
          {dayColumns.map((dayName, dayIndex) => {
            const dayDate = addDays(weekStart, dayIndex);
            const dayDateKey = toDateKeyInTimeZone(dayDate, GYM_TIME_ZONE);
            const isTodayColumn = dayDateKey === todayInGymTimeZone;
            const isPastColumn = dayDateKey < todayInGymTimeZone;
            const daySessions = sessionsByDay[dayName] ?? [];
            return (
              <div key={dayName} className="relative border-l border-border/70">
                {isTodayColumn ? (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: todayColumnTint }}
                  />
                ) : null}
                {isTodayColumn && shouldShowCurrentTimeLine ? (
                  <div
                    className="pointer-events-none absolute left-[2px] right-[2px] -translate-y-1/2"
                    style={{ top: `${currentTimeLineTop}px`, zIndex: 4 }}
                  >
                    <div
                      className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: scheduleTheme.todayTabColor }}
                    />
                    <div className="h-px w-full" style={{ backgroundColor: scheduleTheme.todayTabColor }} />
                  </div>
                ) : null}
                {daySessions.map((session) => {
                  const sessionDate = new Date(session.startDateTime);
                  const startMinutes = toMinutesSinceMidnight(sessionDate);
                  const top = toVerticalOffset(startMinutes);
                  const end = toVerticalOffset(startMinutes + session.durationMinutes);
                  const height = Math.max(end - top, MIN_EVENT_HEIGHT_PX);
                  const showMeta = height >= 36;
                  const sessionCardStyle = getSessionCardStyle(session, isTodayColumn, isPastColumn, scheduleTheme);

                  return (
                    <div
                      key={session.id}
                      className="absolute overflow-hidden rounded-md border border-[#DFDFDF] border-l-4 px-1.5 py-px text-foreground"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        left: isTodayColumn ? '2px' : '4px',
                        right: isTodayColumn ? '2px' : '4px',
                        backgroundColor: sessionCardStyle.backgroundColor,
                        borderColor: sessionCardStyle.borderColor,
                        borderLeftColor: sessionCardStyle.borderLeftColor,
                        boxShadow: sessionCardStyle.boxShadow,
                        transform: sessionCardStyle.transform,
                        transformOrigin: 'center center',
                        zIndex: sessionCardStyle.zIndex,
                      }}
                    >
                      <p
                        className={cn(
                          `text-[11px] font-semibold leading-[1.1] ${showMeta ? 'line-clamp-2' : 'line-clamp-3'}`,
                          sessionCardStyle.titleClassName
                        )}
                      >
                        {session.name}
                      </p>
                      {showMeta ? (
                        <>
                          <p
                            className={cn(
                              'truncate text-[10px] leading-[1.1]',
                              sessionCardStyle.metaClassName
                            )}
                          >
                            {session.instructor}
                            {sessionCardStyle.badge && !session.isCancelled ? (
                              <span className={`ml-1 font-semibold ${sessionCardStyle.badgeClassName}`} style={sessionCardStyle.badgeStyle}>
                                {sessionCardStyle.badge}
                              </span>
                            ) : null}
                          </p>
                          {session.isCancelled ? (
                            <p
                              className={`truncate text-[10px] font-semibold leading-[1.1] ${sessionCardStyle.badgeClassName}`}
                              style={sessionCardStyle.badgeStyle}
                            >
                              [CANCELLED]
                            </p>
                          ) : (
                            <p className={`truncate text-[10px] leading-[1.1] ${sessionCardStyle.metaClassName}`}>
                              {formatEventTimeRange(sessionDate, session.durationMinutes)}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
