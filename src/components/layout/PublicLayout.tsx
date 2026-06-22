import { type MouseEvent, type ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Dumbbell, MapPin, Menu, X } from 'lucide-react';
import logo from '@/assets/LogoVector-PK-white-bg-1.png';
import fbIcon from '@/assets/Logos & Icons/FB Icon.svg';
import igIcon from '@/assets/Logos & Icons/IG Icon.svg';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/locations', label: 'Locations' },
  { to: '/classes', label: 'Classes' },
  { to: '/training', label: 'Training' },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleSamePageClick = (event: MouseEvent<HTMLAnchorElement>, to: string) => {
    setOpen(false);
    if (location.pathname !== to) return;

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    setOpen(false);
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.style.scrollBehavior = '';
  }, [location.pathname]);

  useEffect(() => {
    document.title = 'Optimal Sport Health Clubs';
  }, []);

  const desktopLinks = (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={(event) => handleSamePageClick(event, item.to)}
          className={({ isActive }) =>
            `site-nav-link ${isActive ? 'site-nav-link-active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );

  const mobileLinks = (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={(event) => handleSamePageClick(event, item.to)}
          className={({ isActive }) =>
            `site-nav-link ${isActive ? 'site-nav-link-active' : ''}`
          }
        >
          <span className="mobile-nav-link-label">{item.label}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-os-paper text-os-ink">
      <header className="sticky top-0 z-50 h-20 border-b border-white/10 bg-os-black text-white lg:h-24">
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" onClick={(event) => handleSamePageClick(event, '/')} className="flex cursor-pointer items-center gap-3 -mb-2 mt-1 self-start lg:-mb-7 lg:mt-2">
            <img src={logo} alt="Optimal Sport Health Clubs" draggable={false} className="h-[5.25rem] w-auto select-none object-contain lg:h-24 lg:drop-shadow-2xl" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-7">{desktopLinks}</nav>
            <div className="flex items-center gap-3 border-l border-white/15 pl-6">
              <Link to="/schedule" onClick={(event) => handleSamePageClick(event, '/schedule')} className="icon-cta nav-icon-cta" aria-label="Schedule">
                <CalendarDays className="h-4 w-4" />
              </Link>
              <Link to="/memberships" onClick={(event) => handleSamePageClick(event, '/memberships')} className="site-button site-button-small">
                Join
              </Link>
            </div>
          </div>

          <button
            type="button"
            className={`mobile-menu-toggle lg:hidden ${open ? 'is-open' : ''}`}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <Menu className="menu-toggle-icon menu-toggle-menu" strokeWidth={2.75} aria-hidden="true" />
            <X className="menu-toggle-icon menu-toggle-close" strokeWidth={2.75} aria-hidden="true" />
          </button>
        </div>
        {open ? (
          <div id="mobile-navigation" className="mobile-nav-window lg:hidden">
            <div className="mobile-nav-window-inner">
              <nav className="mobile-nav-links">{mobileLinks}</nav>
              <div className="mobile-nav-actions">
                <Link to="/schedule" onClick={(event) => handleSamePageClick(event, '/schedule')} className="icon-cta justify-center">
                  <CalendarDays className="h-4 w-4" /> Schedule
                </Link>
                <Link to="/memberships" onClick={(event) => handleSamePageClick(event, '/memberships')} className="site-button justify-center">
                  Join
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main key={location.pathname} className="page-transition">{children}</main>

      <footer className="bg-os-black px-5 py-8 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:grid-cols-[1.5fr_1fr] md:gap-6">
          <div className="contents md:flex md:flex-wrap md:items-center md:gap-4">
            <img src={logo} alt="Optimal Sport Health Clubs" draggable={false} className="h-20 select-none object-contain" />
            <div className="flex shrink-0 -translate-x-3 flex-col gap-2 justify-self-center sm:translate-x-0 md:flex-row md:gap-3">
              <a href="https://www.facebook.com/OptimalSport1315" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                <span className="social-icon" style={{ maskImage: `url(${fbIcon})`, WebkitMaskImage: `url(${fbIcon})` }} />
              </a>
              <a href="https://www.instagram.com/optimalnation/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <span className="social-icon" style={{ maskImage: `url(${igIcon})`, WebkitMaskImage: `url(${igIcon})` }} />
              </a>
            </div>
          </div>
          <div className="space-y-2 text-sm text-white/70 justify-self-end md:space-y-3">
            <h2 className="footer-heading">Start Here</h2>
            <Link to="/locations" onClick={(event) => handleSamePageClick(event, '/locations')} className="footer-link"><MapPin className="h-4 w-4" /> Choose a location</Link>
            <Link to="/schedule" onClick={(event) => handleSamePageClick(event, '/schedule')} className="footer-link"><CalendarDays className="h-4 w-4" /> View schedules</Link>
            <Link to="/training" onClick={(event) => handleSamePageClick(event, '/training')} className="footer-link"><Dumbbell className="h-4 w-4" /> Meet our trainers</Link>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl items-start justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/45">
          <div className="space-y-0">
            <p>© {new Date().getFullYear()} Optimal Sport Health Clubs</p>
            <p>
              Designed and deployed by{' '}
              <a href="https://tryshipyard.vercel.app" target="_blank" rel="noopener" className="credit-link">
                Arseni Sutton
              </a>
            </p>
          </div>
          <Link to="/privacy-terms" onClick={(event) => handleSamePageClick(event, '/privacy-terms')} className="credit-link !min-h-0 shrink-0 leading-3.5 after:-bottom-1.5">Privacy & Terms</Link>
        </div>
      </footer>
    </div>
  );
}
