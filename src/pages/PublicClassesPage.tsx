import { Link } from 'react-router-dom';
import { Activity, Bike, Flame, HeartPulse } from 'lucide-react';
import { classes, siteImages } from '@/data/optimalSite';

const categories = [
  { title: 'Strength + Conditioning', icon: Flame, copy: 'Bootcamp, HIIT, Body Blast, circuits, and total-body formats' },
  { title: 'Cycle', icon: Bike, copy: 'Rhythm rides, interval sessions, and hybrid cycle-strength classes' },
  { title: 'Yoga + Pilates', icon: HeartPulse, copy: 'Mobility, breath, core control, and recovery-focused training' },
  { title: 'Active Community', icon: Activity, copy: 'Dance, Silver Sneakers, low-impact options, and class-first energy' },
];

export default function PublicClassesPage() {
  return (
    <div className="page-shell">
      <section className="split-hero">
        <div>
          <p className="eyebrow">Classes</p>
          <h1 className="display-lg">Included classes with enough variety to keep members moving</h1>
          <p className="page-lede">
            A cleaner class library for the new site, with room to add real descriptions, filters, instructors, and location availability later
          </p>
          <Link to="/schedule" className="site-button">View Weekly Schedule</Link>
        </div>
        <img src={siteImages.classes} alt="" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ title, copy, icon: Icon }) => (
          <article key={title} className="category-card">
            <Icon className="h-7 w-7 text-os-orange" />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Class Library</p>
            <h2 className="display-md">Popular formats</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-os-muted">
            This is a starter set based on the existing site. We can add availability, intensity, and location tags in the page-by-page pass
          </p>
        </div>
        <div className="class-grid">
          {classes.map(([name, description], index) => (
            <article key={name} className="class-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
