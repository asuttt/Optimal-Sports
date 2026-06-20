import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { locations, siteImages, classes, trainers } from '@/data/optimalSite';
import { getMapUrls, openAppleMapsOnApplePlatform } from '@/lib/mapLinks';

const trainerPreview = ['Center City', 'Newtown'].flatMap((location) => (
  trainers.filter((trainer) => trainer.location === location).slice(0, 2)
));

export default function PublicHomePage() {
  return (
    <>
      <section className="hero-section">
        <img src={siteImages.hero} alt="" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow text-white/80">Philadelphia + Bucks County</p>
          <h1 className="hero-title">Built for Better Training</h1>
          <p className="hero-copy home-hero-copy">
            Strength, classes, and coaching built for your goals across two Philadelphia-area clubs
          </p>
        </div>
      </section>

      <section className="section-shell home-section relative z-10 pt-10">
        <div className="location-grid">
          {locations.map((location) => (
            <article key={location.id} className="location-card">
              <img src={location.image} alt="" className="location-card-image" />
              <div className="location-card-body">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{location.region}</p>
                    <h2 className={`display-sm ${location.id === 'center-city' ? 'text-[#4264A8]' : 'text-os-orange'}`}>{location.shortName}</h2>
                    <p className="mt-1 font-semibold">{location.name}</p>
                  </div>
                  <Link to={`/schedule?location=${location.id}`} className={`site-button site-button-small ${location.id === 'center-city' ? 'location-center-button' : ''}`}>
                    <CalendarDays className="h-4 w-4" /> Schedule
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-6 text-os-muted">{location.summary}</p>
                <div className="mt-5 border-y border-os-line py-4 text-sm">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mini-label">Hours</p>
                      <p>{location.hours[0]}</p>
                      <p>{location.hours[1]}</p>
                      <p>{location.hours[2]}</p>
                      <p>{location.hours[3]}</p>
                    </div>
                    <div>
                      <p className="mini-label">Address</p>
                      <a
                        href={getMapUrls(location.address.join(' '), location.appleMapsUrl).google}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => openAppleMapsOnApplePlatform(event, location.address.join(' '), location.appleMapsUrl)}
                        className={`address-map-link ${location.id === 'center-city' ? 'location-center-map-link' : ''}`}
                      >
                        <MapPin className={`mt-1 h-4 w-4 shrink-0 ${location.id === 'center-city' ? 'text-[#4264A8]' : 'text-os-orange'}`} />
                        <span>
                          {location.address.map((line) => <span key={line}>{line}</span>)}
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 border-t border-os-line pt-4 sm:grid-cols-2">
                    <a href={`tel:+1${location.phone.replace(/\D/g, '')}`} className={`contact-link ${location.id === 'center-city' ? 'location-center-contact-link' : ''}`}>
                      <Phone className="h-4 w-4" /> {location.phone}
                    </a>
                    <a href={`mailto:${location.email}`} className={`contact-link ${location.id === 'center-city' ? 'location-center-contact-link' : ''}`}>
                      <Mail className="h-4 w-4" /> {location.email}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {location.highlights.map((item) => <span key={item} className="pill">{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell home-section section-grid pt-8">
        <div>
          <p className="eyebrow">Classes Included</p>
          <h2 className="display-md">A class lineup with range</h2>
          <p className="section-copy">
            Center City keeps core formats accessible throughout the workday, while Newtown offers a comprehensive, multi-studio schedule
          </p>
          <Link to="/classes" className="text-link">Explore Classes <ArrowRight className="h-4 w-4" /></Link>
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
        <div className="section-shell home-section section-grid">
          <div className="image-stack">
            <img src={siteImages.training} alt="" />
            <img src={siteImages.newtownStudio} alt="" />
          </div>
          <div>
            <p className="eyebrow text-os-gold">Personal Training</p>
            <h2 className="display-md text-white">Coaching that gives you a plan</h2>
            <p className="section-copy text-white/70">
              Check out out team of experienced training professionals
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trainerPreview.map((trainer) => (
                <div key={trainer.name} className="trainer-mini">
                  <img src={trainer.image} alt="" />
                  <div>
                    <h3>{trainer.name}</h3>
                    <p>
                      <span className="font-semibold text-white">{trainer.location}</span> · {trainer.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/training" className="text-link text-link-dark">Meet the Team <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-shell home-section">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2 className="display-md">Pick a club, compare plans, or try a pass</h2>
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
