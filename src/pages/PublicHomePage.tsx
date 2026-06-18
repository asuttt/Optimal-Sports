import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Phone } from 'lucide-react';
import { locations, siteImages, classes, trainers } from '@/data/optimalSite';

export default function PublicHomePage() {
  return (
    <>
      <section className="hero-section">
        <img src={siteImages.hero} alt="" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow text-white/80">Philadelphia + Bucks County</p>
          <h1 className="hero-title">Serious fitness. Serious value.</h1>
          <p className="hero-copy">
            Two Optimal Sport clubs with strength floors, group fitness, personal training, and schedules built around real life.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/locations" className="site-button">Choose Your Club</Link>
            <Link to="/schedule" className="site-button-secondary bg-white/10 text-white hover:bg-white/20">View Schedule</Link>
          </div>
        </div>
      </section>

      <section className="section-shell -mt-10 relative z-10">
        <div className="location-grid">
          {locations.map((location) => (
            <article key={location.id} className="location-card">
              <img src={location.image} alt="" className="location-card-image" />
              <div className="location-card-body">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{location.region}</p>
                    <h2 className="display-sm text-os-orange">{location.shortName}</h2>
                    <p className="mt-1 font-semibold">{location.name}</p>
                  </div>
                  <span className="tag">{location.badge}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-os-muted">{location.summary}</p>
                <div className="mt-5 grid gap-4 border-y border-os-line py-5 text-sm md:grid-cols-2">
                  <div>
                    <p className="mini-label">Hours</p>
                    <p>{location.hours[0]}</p>
                    <p>{location.hours[1]}</p>
                    <p>{location.hours[2]}</p>
                    <p>{location.hours[3]}</p>
                  </div>
                  <div>
                    <p className="mini-label">Address</p>
                    {location.address.map((line) => <p key={line}>{line}</p>)}
                    <a href={`tel:+1${location.phone.replace(/\D/g, '')}`} className="mt-2 inline-flex items-center gap-2 font-bold">
                      <Phone className="h-4 w-4" /> {location.phone}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {location.highlights.map((item) => <span key={item} className="pill">{item}</span>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/schedule" className="site-button site-button-small"><CalendarDays className="h-4 w-4" /> Schedule</Link>
                  <Link to="/memberships" className="site-button-secondary site-button-small">Join {location.shortName}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-grid">
        <div>
          <p className="eyebrow">Classes Included</p>
          <h2 className="display-md">A class lineup with real range.</h2>
          <p className="section-copy">
            Newtown leads with a deep multi-studio schedule, while Center City keeps core formats accessible around the workday.
          </p>
          <Link to="/classes" className="text-link">Explore classes <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="feature-list">
          {classes.slice(0, 6).map(([name, description]) => (
            <div key={name} className="feature-row">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-band">
        <div className="section-shell section-grid">
          <div className="image-stack">
            <img src={siteImages.training} alt="" />
            <img src={siteImages.newtownStudio} alt="" />
          </div>
          <div>
            <p className="eyebrow text-os-gold">Personal Training</p>
            <h2 className="display-md text-white">Coaching that gives the gym a plan.</h2>
            <p className="section-copy text-white/70">
              Trainer profiles can become a stronger selling page: location tags, specialties, certs, and quick bios instead of a flat directory.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trainers.slice(0, 4).map((trainer) => (
                <div key={trainer.name} className="trainer-mini">
                  <img src={trainer.image} alt="" />
                  <div>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.location} · {trainer.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/training" className="site-button mt-6">Meet the Team</Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2 className="display-md">Pick a club, compare plans, or try a pass.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/memberships" className="site-button">Memberships</Link>
            <Link to="/locations" className="site-button-secondary"><MapPin className="h-4 w-4" /> Locations</Link>
          </div>
        </div>
      </section>
    </>
  );
}
