import { Award, Dumbbell, MapPin } from 'lucide-react';
import { trainers } from '@/data/optimalSite';

const trainerLocationClass = (location: string) => (
  location === 'Center City' ? 'trainer-location-center' : 'trainer-location-newtown'
);

const trainerLocations = ['Center City', 'Newtown'] as const;

function TrainerCard({ trainer }: { trainer: (typeof trainers)[number] }) {
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

export default function PublicTrainingPage() {
  return (
    <div className="page-shell">
      <section>
        <p className="eyebrow">Training</p>
        <h1 className="display-lg">Specialized support across Center City and Newtown</h1>
      </section>

      <section className="training-intro">
        <div>
          <Dumbbell className="h-6 w-6 text-os-orange" />
          <h2>Programming</h2>
          <p>Goal-based training across strength, conditioning, mobility, nutrition, performance, and class support</p>
        </div>
        <div>
          <Award className="h-6 w-6 text-os-orange" />
          <h2>Credentials</h2>
          <p>Certified coaches spanning CPT, CSCS, nutrition, group exercise, adaptive training, physical therapy, and more</p>
        </div>
        <div>
          <MapPin className="h-6 w-6 text-os-orange" />
          <h2>Location fit</h2>
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
                  <TrainerCard key={trainer.name} trainer={trainer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
