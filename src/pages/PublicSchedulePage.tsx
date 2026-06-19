import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { LocationId, locations, schedule } from '@/data/optimalSite';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const locationIds = locations.map((location) => location.id);

function getInitialLocation(locationParam: string | null): LocationId {
  return locationIds.includes(locationParam as LocationId) ? locationParam as LocationId : 'newtown';
}

export default function PublicSchedulePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLocation, setActiveLocation] = useState<LocationId>(() => getInitialLocation(searchParams.get('location')));
  const [activeStudio, setActiveStudio] = useState('All');
  const currentDay = useMemo(() => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()), []);
  const activeSchedule = schedule[activeLocation];
  const location = locations.find((item) => item.id === activeLocation)!;
  const studios = ['All', ...activeSchedule.studios];

  const visibleSessions = activeSchedule.sessions.filter((session) => activeStudio === 'All' || session[3] === activeStudio);

  useEffect(() => {
    const locationParam = getInitialLocation(searchParams.get('location'));

    if (locationParam !== activeLocation) {
      setActiveLocation(locationParam);
      setActiveStudio('All');
    }
  }, [activeLocation, searchParams]);

  return (
    <div className="page-shell">
      <section className="page-hero page-hero-row">
        <div>
          <p className="eyebrow">Schedule</p>
          <h1 className="display-lg">One schedule page, two location views</h1>
          <p className="page-lede">
            Dummy classes for now. The important first-pass UX is fast switching between Center City and Newtown, with studio filtering ready for Newtown
          </p>
        </div>
        <div className="schedule-location-card">
          <MapPin className="h-5 w-5 text-os-orange" />
          <div>
            <strong>{location.name}</strong>
            <p>{location.address.at(-1)}</p>
          </div>
        </div>
      </section>

      <div className="schedule-controls">
        <div className="segmented">
          {locations.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeLocation === item.id ? 'active' : ''}
              onClick={() => {
                setActiveLocation(item.id);
                setActiveStudio('All');
                setSearchParams({ location: item.id });
              }}
            >
              {item.shortName}
            </button>
          ))}
        </div>
        <div className="segmented segmented-small">
          {studios.map((studio) => (
            <button key={studio} type="button" className={activeStudio === studio ? 'active' : ''} onClick={() => setActiveStudio(studio)}>
              {studio}
            </button>
          ))}
        </div>
      </div>

      <section className="weekly-schedule">
        {days.map((day) => {
          const sessions = visibleSessions.filter((session) => session[0] === day);
          const isToday = day === currentDay;

          return (
            <article key={day} className={isToday ? 'day-column today' : 'day-column'}>
              <div className="day-heading">
                <CalendarDays className="h-4 w-4" />
                <h2>{day}</h2>
                {isToday ? <span>Today</span> : null}
              </div>
              <div className="space-y-3">
                {sessions.length ? sessions.map((session) => (
                  <div key={`${session[0]}-${session[1]}-${session[2]}-${session[3]}`} className="session-card">
                    <time>{session[1]}</time>
                    <h3>{session[2]}</h3>
                    <p>{session[3]} · {session[4]}</p>
                  </div>
                )) : (
                  <p className="empty-day">No classes listed</p>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
