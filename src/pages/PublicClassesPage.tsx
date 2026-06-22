import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Bike, Flame, HeartPulse } from 'lucide-react';
import { classes } from '@/data/optimalSite';

const categories = [
  { title: 'Strength + Conditioning', icon: Flame, copy: 'Bootcamp, HIIT, Body Blast, circuits, and total-body formats' },
  { title: 'Cycle', icon: Bike, copy: 'Rhythm rides, interval sessions, and hybrid cycle-strength classes' },
  { title: 'Yoga + Pilates', icon: HeartPulse, copy: 'Mobility, breath, core control, and recovery-focused training' },
  { title: 'Active Community', icon: Activity, copy: 'Dance, Silver Sneakers, low-impact options, and class-first energy' },
];

export default function PublicClassesPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Classes</p>
        <h1 className="display-lg">More Ways to Move</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ title, copy, icon: Icon }) => (
          <article key={title} className="category-card">
            <div className="category-card-heading">
              <Icon className="h-7 w-7 shrink-0 text-os-orange" />
              <h2>{title}</h2>
            </div>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <div className="!mt-4 flex justify-end lg:hidden">
        <Link to="/schedule" className="text-link !mt-0">View schedule <ArrowRight className="h-4 w-4" /></Link>
      </div>

      <section className="!mt-4 lg:!mt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Class Library</p>
            <h2 className="display-md">Find your format</h2>
          </div>
          <Link to="/schedule" className="text-link ml-auto hidden lg:inline-flex">View schedule <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="class-grid">
          {classes.map(([name, description], index) => (
            <article key={name} className="class-card">
              <div className="class-card-heading">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
              </div>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
