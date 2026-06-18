import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { locations } from '@/data/optimalSite';

export default function PublicFacilityPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Two Clubs</p>
        <h1 className="display-lg">Choose the Optimal Sport that fits your routine.</h1>
        <p className="page-lede">
          Center City is built for downtown training convenience. Newtown is the class-forward Bucks County club with more studio depth.
        </p>
      </section>

      <div className="space-y-12">
        {locations.map((location, index) => (
          <section key={location.id} className={`location-detail ${index % 2 ? 'lg:[&_.location-media]:order-2' : ''}`}>
            <div className="location-media">
              <img src={location.images[0]} alt="" className="main-location-photo" />
              <div className="location-thumbs">
                {location.images.slice(1, 5).map((image) => <img key={image} src={image} alt="" />)}
              </div>
            </div>
            <div>
              <p className="eyebrow">{location.region}</p>
              <h2 className="display-md text-os-orange">{location.name}</h2>
              <p className="section-copy">{location.summary}</p>
              <div className="mt-6 grid gap-5 border-y border-os-line py-6 sm:grid-cols-2">
                <div>
                  <p className="mini-label">Address</p>
                  {location.address.map((line) => <p key={line}>{line}</p>)}
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address.join(' '))}`} className="mt-3 inline-flex items-center gap-2 font-bold text-os-orange">
                    <MapPin className="h-4 w-4" /> Open Map
                  </a>
                </div>
                <div>
                  <p className="mini-label">Contact</p>
                  <a href={`tel:+1${location.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 font-bold">
                    <Phone className="h-4 w-4" /> {location.phone}
                  </a>
                  <p className="mt-2">{location.email}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {location.highlights.map((item) => (
                  <div key={item} className="offer-card">
                    <h3>{item}</h3>
                    <p>Placeholder descriptor for this location feature, ready for client-specific detail.</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/schedule" className="site-button">View Schedule</Link>
                <Link to="/memberships" className="text-link">Membership Options <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
