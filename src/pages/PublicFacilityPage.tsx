import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, CirclePlay, X } from 'lucide-react';
import { locations } from '@/data/optimalSite';

export default function PublicFacilityPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);

  const closeLightbox = useCallback(() => {
    setIsLightboxClosing(true);
    window.setTimeout(() => {
      setActiveImage(null);
      setIsLightboxClosing(false);
    }, 180);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };

    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeImage, closeLightbox]);

  return (
    <div className="page-shell location-page-shell">
      <section className="page-hero location-page-hero">
        <p className="eyebrow">Locations</p>
        <h1 className="display-lg">Two Clubs, One Goal</h1>
      </section>

      <div className="location-sections space-y-10 lg:space-y-12">
        {locations.map((location, index) => (
          <section key={location.id}>
            <div className="location-mobile-divider lg:hidden">
              <p className={`eyebrow ${location.id === 'center-city' ? 'trainer-location-center' : 'trainer-location-newtown'}`}>{location.shortName}</p>
              <span />
            </div>
            <div className={`location-detail ${index % 2 ? 'lg:[&_.location-media]:order-2' : ''}`}>
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
                  {location.images.slice(1, 5).map((image, imageIndex) => (
                    <button
                      key={image}
                      type="button"
                      className="location-thumb-button"
                      aria-label={`View ${location.shortName} photo ${imageIndex + 1}`}
                      onClick={() => {
                        setIsLightboxClosing(false);
                        setActiveImage(image);
                      }}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
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
                <div className="mt-7 flex flex-wrap items-center justify-end gap-3 lg:justify-start">
                  <Link to={`/schedule?location=${location.id}`} className={`site-button ${location.id === 'center-city' ? 'location-center-button' : ''}`}>
                    <CalendarDays className="h-4 w-4" /> Schedule
                  </Link>
                  <Link to={`/memberships?location=${location.id}`} className={`text-link !mt-0 ${location.id === 'center-city' ? 'location-center-link' : ''}`}>Memberships <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {activeImage ? (
        <div className={`facility-lightbox ${isLightboxClosing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Expanded facility photo" onClick={closeLightbox}>
          <div className="facility-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="facility-lightbox-close" aria-label="Close expanded photo" onClick={closeLightbox} autoFocus>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <img src={activeImage} alt="Expanded facility view" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
