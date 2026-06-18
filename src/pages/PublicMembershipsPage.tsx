import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { locations, memberships } from '@/data/optimalSite';

const benefits = ['Classes included', 'Strength + cardio access', 'Personal training available', 'Starter pricing pending'];

export default function PublicMembershipsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero page-hero-row">
        <div>
          <p className="eyebrow">Memberships</p>
          <h1 className="display-lg">Compare plans by location</h1>
          <p className="page-lede">
            Dummy values for now, shaped like the final page so we can refine pricing and offers once the client confirms details
          </p>
        </div>
        <Link to="/locations" className="site-button">Find Your Club</Link>
      </section>

      <section className="membership-table">
        <div className="membership-row membership-head">
          <div />
          {locations.map((location) => (
            <div key={location.id}>
              <p className="eyebrow">{location.region}</p>
              <h2>{location.shortName}</h2>
              {location.id === 'newtown' ? <span className="popular-badge"><Star className="h-4 w-4" /> Class Favorite</span> : null}
            </div>
          ))}
        </div>
        {['Individual', 'Couple', 'Family'].map((tier, index) => (
          <div key={tier} className="membership-row">
            <div className="mini-label">{tier}</div>
            <PlanCell data={memberships.center[index]} />
            <PlanCell data={memberships.newtown[index]} featured={index === 0} />
          </div>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {locations.map((location) => (
          <section key={location.id} className="pricing-card">
            <img src={location.image} alt="" />
            <div>
              <p className="eyebrow">{location.shortName}</p>
              <h2 className="display-sm">What’s included</h2>
              <div className="mt-5 grid gap-3">
                {benefits.map((benefit) => (
                  <p key={benefit} className="flex items-center gap-3 text-sm">
                    <span className="check-dot"><Check className="h-4 w-4" /></span>
                    {benefit}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:+1${location.phone.replace(/\D/g, '')}`} className="site-button site-button-small">Call {location.shortName}</a>
                <Link to="/schedule" className="site-button-secondary site-button-small">View Schedule</Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="fine-print">
        <h2>Pricing Notes</h2>
        <p>
          Placeholder pricing and enrollment fees. Add exact membership tiers, annual fees, cancellation policies, corporate/student rates, and any free-pass terms during refinement
        </p>
      </section>
    </div>
  );
}

function PlanCell({ data, featured = false }: { data: string[]; featured?: boolean }) {
  return (
    <div className={featured ? 'plan-cell plan-cell-featured' : 'plan-cell'}>
      <strong>{data[1]}</strong>
      <span>{data[2]}</span>
    </div>
  );
}
