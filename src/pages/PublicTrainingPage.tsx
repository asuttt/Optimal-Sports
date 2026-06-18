import { Link } from 'react-router-dom';
import { Award, Dumbbell, MapPin } from 'lucide-react';
import { siteImages, trainers } from '@/data/optimalSite';

export default function PublicTrainingPage() {
  return (
    <div className="page-shell">
      <section className="split-hero">
        <div>
          <p className="eyebrow">Training</p>
          <h1 className="display-lg">Trainer profiles with more context than a directory</h1>
          <p className="page-lede">
            Editorial cards give each coach a stronger first impression: location, role, credentials, specialties, and a short point of view
          </p>
          <Link to="/memberships" className="site-button">Start Training</Link>
        </div>
        <img src={siteImages.training} alt="" />
      </section>

      <section className="training-intro">
        <div>
          <Dumbbell className="h-8 w-8 text-os-orange" />
          <h2>Programming</h2>
          <p>Goal-based sessions, clear progressions, and support for members who want a plan</p>
        </div>
        <div>
          <Award className="h-8 w-8 text-os-orange" />
          <h2>Credentials</h2>
          <p>Certification details are surfaced quickly, then expanded into full bios later</p>
        </div>
        <div>
          <MapPin className="h-8 w-8 text-os-orange" />
          <h2>Location fit</h2>
          <p>Trainer cards make it obvious who works in Center City, Newtown, or both</p>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="eyebrow">Coaches</p>
          <h2 className="display-md">Featured trainers</h2>
        </div>
        <div className="trainer-grid">
          {trainers.map((trainer) => (
            <article key={trainer.name} className="trainer-card">
              <img src={trainer.image} alt="" />
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow">{trainer.location}</p>
                    <h3>{trainer.name}</h3>
                    <p className="trainer-role">{trainer.role}</p>
                  </div>
                  <span className="tag">{trainer.credentials}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-os-muted">{trainer.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {trainer.focus.map((item) => <span key={item} className="pill">{item}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
