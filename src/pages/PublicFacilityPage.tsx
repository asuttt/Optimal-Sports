import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, CirclePlay } from 'lucide-react';
import { locations } from '@/data/optimalSite';

export default function PublicFacilityPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Two Clubs</p>
        <h1 className="display-lg">Two Locations, One Mission</h1>
      </section>

      <div className="space-y-12">
        {locations.map((location, index) => (
          <section key={location.id} className={`location-detail ${index % 2 ? 'lg:[&_.location-media]:order-2' : ''}`}>
            <div className="location-media">
              <div
                className={`location-walkthrough-placeholder ${location.id === 'newtown' ? 'location-walkthrough-placeholder-newtown' : ''}`}
                role="img"
                aria-label={`${location.name} facility walkthrough`}
              >
                <CirclePlay className="h-10 w-10" aria-hidden="true" />
                <p>[{location.shortName} Facility Walkthrough]</p>
              </div>
              <div className="location-thumbs">
                {location.images.slice(1, 5).map((image) => <img key={image} src={image} alt="" />)}
              </div>
            </div>
            <div>
              <p className="eyebrow">{location.region}</p>
              <h2 className={`display-md ${location.id === 'center-city' ? 'text-[#4264A8]' : 'text-os-orange'}`}>{location.name}</h2>
              <p className="section-copy">{location.summary}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {location.highlights.map((item) => (
                  <div key={item} className="offer-card">
                    <h3>{item}</h3>
                    <p>Placeholder descriptor for this location feature, ready for client-specific detail</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/schedule" className={`site-button ${location.id === 'center-city' ? 'location-center-button' : ''}`}>
                  <CalendarDays className="h-4 w-4" /> Schedule
                </Link>
                <Link to="/memberships" className={`text-link !mt-0 ${location.id === 'center-city' ? 'location-center-link' : ''}`}>Memberships <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
