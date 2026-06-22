import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Building2, Check, Sparkles } from 'lucide-react';
import { locations, membershipPlans, type LocationId } from '@/data/optimalSite';

function getMembershipSeason(date = new Date()) {
  const month = date.getMonth();

  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  if (month === 11 || month <= 1) return 'winter';
  return 'spring';
}

export default function PublicMembershipsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedLocation = searchParams.get('location');
  const locationId: LocationId = requestedLocation === 'newtown' ? 'newtown' : 'center-city';
  const location = locations.find((item) => item.id === locationId)!;
  const plans = membershipPlans[locationId];
  const promoDetail = plans.promo.detail.replace('{season}', getMembershipSeason());

  const selectLocation = (nextLocation: LocationId) => {
    setSearchParams({ location: nextLocation });
  };

  return (
    <div className={`page-shell memberships-page memberships-page-${locationId}`}>
      <section className="memberships-heading">
        <div>
          <p className="eyebrow">Memberships</p>
          <h1 className="display-lg">Join Optimal</h1>
        </div>
        <div className="membership-location-toggle" role="tablist" aria-label="Membership location">
          {locations.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === locationId}
              className={item.id === locationId ? 'active' : ''}
              onClick={() => selectLocation(item.id)}
            >
              {item.shortName}
            </button>
          ))}
        </div>
      </section>

      <section className="membership-panel">
        <header className="membership-panel-header">
          <div>
            <p className="eyebrow">{location.region}</p>
            <h2 className="display-md">{location.name}</h2>
            <p className="section-copy">Choose the membership tier that fits how you train</p>
          </div>
          <a href={location.trialSignupUrl} target="_blank" rel="noopener noreferrer" className="membership-trial membership-trial-desktop">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            <span><strong>3-Day Free Trial</strong><small>Start with the club before you commit</small></span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </header>

        <div className="membership-plan-grid">
          {plans.plans.map((plan) => (
            <article key={plan.name} className={`membership-plan-card ${plan.badge ? 'membership-plan-featured' : ''}`}>
              {plan.badge ? <span className="membership-plan-badge"><Check className="h-3.5 w-3.5" /> {plan.badge}</span> : null}
              <p className="mini-label">{plan.payment}</p>
              <h3>{plan.name}</h3>
              <p className="membership-price"><strong><FormattedPrice price={plan.price} /></strong>{plan.cadence ? <span>{plan.cadence}</span> : null}</p>
              <p className="membership-plan-detail">{plan.detail}</p>
            </article>
          ))}
        </div>

        <aside className="membership-promo">
          <div>
            <p className="eyebrow">{plans.promo.label}</p>
            <h3>{plans.promo.title}</h3>
            <p>{promoDetail}</p>
          </div>
          <p className="membership-promo-price"><FormattedPrice price={plans.promo.price} /></p>
        </aside>
        <footer className="membership-panel-action">
          <a href={location.trialSignupUrl} target="_blank" rel="noopener noreferrer" className="membership-trial-compact sm:hidden">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> 3-Day Trial
          </a>
          <a href={location.membershipSignupUrl} target="_blank" rel="noopener noreferrer" className="site-button">
            Sign Up <ArrowRight className="h-4 w-4" />
          </a>
        </footer>
      </section>

      {plans.partnerRates ? (
        <section className="membership-partner-rates">
          <div className="membership-partner-heading">
            <Building2 className="h-6 w-6" aria-hidden="true" />
            <div>
              <p className="eyebrow">Center City Residents</p>
              <h2>{plans.partnerRates.title}</h2>
              <p>{plans.partnerRates.detail}</p>
            </div>
          </div>
          <div className="membership-partner-grid">
            {plans.partnerRates.rates.map((rate) => (
              <div key={rate.term}>
                <span>{rate.term}</span>
                <PartnerRatePrice price={rate.price} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="membership-notes">
        <h2>Pricing Notes</h2>
        <p>{locationId === 'center-city' ? 'Rates shown reflect ACH pricing; card payments charged to account for processing fees. Annual fees not included' : 'Promotional availability, eligibility, and final membership terms should be confirmed with the club. Annual fees not included'}</p>
      </section>
    </div>
  );
}

function FormattedPrice({ price }: { price: string }) {
  const match = price.match(/^\$(\d+)(?:\.(\d{2}))?(.*)$/);

  if (!match) return price;

  const [, dollars, cents, suffix] = match;

  return (
    <span aria-label={price}>
      <span aria-hidden="true">${dollars}{cents ? <span className="price-cents">.{cents}</span> : null}</span>
      {suffix ? <span className="price-suffix">{suffix}</span> : null}
    </span>
  );
}

function PartnerRatePrice({ price }: { price: string }) {
  const match = price.match(/^\$(\d+)(\.\d{2})(\/mo)$/);

  if (!match) return <strong>{price}</strong>;

  const [, dollars, cents, cadence] = match;

  return (
    <p className="partner-rate-price" aria-label={price}>
      <strong><FormattedPrice price={`$${dollars}${cents}`} /></strong>
      <span aria-hidden="true">{cadence}</span>
    </p>
  );
}
