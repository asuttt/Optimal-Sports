import { useCallback, useEffect, useState } from 'react';
import { Award, Dumbbell, MapPin, X } from 'lucide-react';
import { trainers } from '@/data/optimalSite';

const trainerLocationClass = (location: string) => (
  location === 'Center City' ? 'trainer-location-center' : 'trainer-location-newtown'
);

const trainerLocations = ['Center City', 'Newtown'] as const;
type Trainer = (typeof trainers)[number];
const rosterTopAlignedTrainers = new Set(['Savanna Barris', 'Mike Neuman', 'Molly Craig']);

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="trainer-card">
      <img src={trainer.image} alt="" />
      <div>
        <div className="trainer-card-header">
          <div>
            <p className={`eyebrow ${trainerLocationClass(trainer.location)}`}>{trainer.location}</p>
            <h3>{trainer.name}</h3>
            <p className="trainer-role">{trainer.role}</p>
          </div>
          <span className="tag">{trainer.credentials}</span>
        </div>
        <p className="trainer-bio">{trainer.bio}</p>
        <div className="trainer-pill-row">
          {trainer.focus.map((item) => (
            <span key={item} className={`pill ${trainerLocationClass(trainer.location)}`}>{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function TrainerRosterCard({ trainer, onSelect }: { trainer: Trainer; onSelect: () => void }) {
  return (
    <button type="button" className="trainer-roster-card" onClick={onSelect} aria-label={`View ${trainer.name}'s profile`}>
      <img
        src={trainer.image}
        alt={`Portrait of ${trainer.name}`}
        className={rosterTopAlignedTrainers.has(trainer.name) ? 'trainer-roster-image-top' : undefined}
      />
      <div>
        <p className={`eyebrow ${trainerLocationClass(trainer.location)}`}>{trainer.location}</p>
        <h3>{trainer.name}</h3>
        <p>{trainer.role}</p>
      </div>
    </button>
  );
}

export default function PublicTrainingPage() {
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null);
  const [isProfileClosing, setIsProfileClosing] = useState(false);

  const closeProfile = useCallback(() => {
    setIsProfileClosing(true);
    window.setTimeout(() => {
      setActiveTrainer(null);
      setIsProfileClosing(false);
    }, 180);
  }, []);

  useEffect(() => {
    if (!activeTrainer) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProfile();
    };

    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeTrainer, closeProfile]);

  return (
    <>
      <div className="page-shell">
        <section>
          <p className="eyebrow">Training</p>
          <h1 className="display-lg">Specialized support across Center City and Newtown</h1>
        </section>

        <section className="training-intro">
          <div>
            <div className="training-intro-heading">
              <Dumbbell className="h-6 w-6 shrink-0 text-os-orange" />
              <h2>Programming</h2>
            </div>
            <p>Goal-based training across strength, conditioning, mobility, nutrition, performance, and class support</p>
          </div>
          <div>
            <div className="training-intro-heading">
              <Award className="h-6 w-6 shrink-0 text-os-orange" />
              <h2>Credentials</h2>
            </div>
            <p>Certified coaches spanning CPT, CSCS, nutrition, group exercise, adaptive training, physical therapy, and more</p>
          </div>
          <div>
            <div className="training-intro-heading">
              <MapPin className="h-6 w-6 shrink-0 text-os-orange" />
              <h2>Location fit</h2>
            </div>
            <p>Scan by club with matching color cues</p>
            <div className="training-location-tags">
              <span className="trainer-location-center">Center City</span>
              <span className="trainer-location-newtown">Newtown</span>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="eyebrow">Coaches</p>
            <h2 className="display-md">Featured trainers</h2>
          </div>
          <div className="space-y-8">
            {trainerLocations.map((location) => (
              <div key={location}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className={`eyebrow ${trainerLocationClass(location)}`}>{location}</h3>
                  <span className="h-px flex-1 bg-os-line" />
                </div>
                <div className="trainer-grid">
                  {trainers.filter((trainer) => trainer.location === location).map((trainer) => (
                    <TrainerRosterCard
                      key={`roster-${trainer.name}`}
                      trainer={trainer}
                      onSelect={() => {
                        setIsProfileClosing(false);
                        setActiveTrainer(trainer);
                      }}
                    />
                  ))}
                  {trainers.filter((trainer) => trainer.location === location).map((trainer) => (
                    <TrainerCard key={trainer.name} trainer={trainer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {activeTrainer ? (
        <div
          className={`trainer-profile-overlay ${isProfileClosing ? 'is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTrainer.name} profile`}
          onClick={closeProfile}
        >
          <article className="trainer-profile-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={`trainer-profile-close ${activeTrainer.location === 'Center City' ? 'overlay-close-center' : 'overlay-close-newtown'}`}
              onClick={closeProfile}
              aria-label="Close trainer profile"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img src={activeTrainer.image} alt={`Portrait of ${activeTrainer.name}`} />
            <div className="trainer-profile-content">
              <p className={`eyebrow ${trainerLocationClass(activeTrainer.location)}`}>{activeTrainer.location}</p>
              <h2>{activeTrainer.name}</h2>
              <p className="trainer-role">{activeTrainer.role}</p>
              <p className="trainer-profile-credentials">{activeTrainer.credentials}</p>
              <p className="trainer-profile-bio">{activeTrainer.bio}</p>
              <div className="trainer-profile-pills">
                {activeTrainer.focus.map((item) => (
                  <span key={item} className={`pill ${trainerLocationClass(activeTrainer.location)}`}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
