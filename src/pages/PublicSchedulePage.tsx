import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { LocationId, locations, schedule } from '@/data/optimalSite';
import { getMapUrls, openAppleMapsOnApplePlatform } from '@/lib/mapLinks';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const locationIds = locations.map((location) => location.id);

function getInitialLocation(locationParam: string | null): LocationId {
  return locationIds.includes(locationParam as LocationId) ? locationParam as LocationId : 'newtown';
}

function getWeekDates(today: Date) {
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  return Object.fromEntries(days.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return [day, `${day.slice(0, 3)} ${date.getMonth() + 1}/${date.getDate()}`];
  }));
}

export default function PublicSchedulePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLocation, setActiveLocation] = useState<LocationId>(() => getInitialLocation(searchParams.get('location')));
  const [activeStudio, setActiveStudio] = useState('All');
  const today = useMemo(() => new Date(), []);
  const currentDay = useMemo(() => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today), [today]);
  const weekDates = useMemo(() => getWeekDates(today), [today]);
  const activeSchedule = schedule[activeLocation];
  const location = locations.find((item) => item.id === activeLocation)!;
  const isNewtown = activeLocation === 'newtown';
  const studios = ['All', ...activeSchedule.studios];
  const visibleSessions = activeSchedule.sessions.filter((session) => activeStudio === 'All' || session[3] === activeStudio);

  useEffect(() => {
    const locationParam = getInitialLocation(searchParams.get('location'));

    if (locationParam !== activeLocation) {
      setActiveLocation(locationParam);
      setActiveStudio('All');
    }
  }, [activeLocation, searchParams]);

  function selectLocation(locationId: LocationId) {
    setActiveLocation(locationId);
    setActiveStudio('All');
    setSearchParams({ location: locationId });
  }

  return (
    <div className={`page-shell schedule-page ${isNewtown ? 'schedule-page-newtown' : 'schedule-page-center'}`}>
      <section className="page-hero schedule-hero">
        <p className="eyebrow">Class Schedule</p>
        <h1 className="display-lg">Find Your Next Class</h1>
      </section>

      <section className="schedule-board" aria-label="Weekly class schedule">
        <header className="schedule-board-header">
          <div className="schedule-location-toggle" role="tablist" aria-label="Schedule location">
            {locations.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeLocation === item.id ? 'active' : ''}
                role="tab"
                aria-selected={activeLocation === item.id}
                onClick={() => selectLocation(item.id)}
              >
                {item.shortName}
              </button>
            ))}
          </div>
          <div className="schedule-location-meta">
            <span className="schedule-location-name">{location.name}</span>
            <a
              href={getMapUrls(location.address.join(' '), location.appleMapsUrl).google}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => openAppleMapsOnApplePlatform(event, location.address.join(' '), location.appleMapsUrl)}
              className="schedule-map-link"
            >
              <MapPin className="h-4 w-4" />
              <span>{location.address.at(-1)}</span>
            </a>
          </div>
        </header>

        {isNewtown ? (
          <div className="schedule-studio-toolbar">
            <p>Browse Newtown&apos;s three-studio schedule</p>
            <div className="schedule-studio-filter" role="group" aria-label="Filter by studio">
              {studios.map((studio) => (
                <button
                  key={studio}
                  type="button"
                  className={activeStudio === studio ? 'active' : ''}
                  onClick={() => setActiveStudio(studio)}
                >
                  {studio}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="weekly-schedule">
          {days.map((day) => {
            const sessions = visibleSessions.filter((session) => session[0] === day);
            const isToday = day === currentDay;

            return (
              <article key={day} className={isToday ? 'day-column today' : 'day-column'}>
                <div className="day-heading">
                  <CalendarDays className="h-4 w-4" />
                  <h2>{weekDates[day]}</h2>
                  {isToday ? <span>Today</span> : null}
                </div>
                <div className="schedule-session-list">
                  {sessions.length ? sessions.map((session) => (
                    <div key={`${session[0]}-${session[1]}-${session[2]}-${session[3]}`} className="session-card">
                      <time>{session[1]}</time>
                      <h3>{session[2]}</h3>
                      {isNewtown ? (
                        <p>
                          <span className={`session-studio ${session[3].toLowerCase().replace(' ', '-')}`}>{session[3]}</span>
                          <span>{session[4]}</span>
                        </p>
                      ) : null}
                    </div>
                  )) : (
                    <p className="empty-day">No classes listed</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
