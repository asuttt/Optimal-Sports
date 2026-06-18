import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Dumbbell, MapPin, Menu, Ticket } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import logo from '@/assets/LogoVector-PK-white-bg-1.png';
import fbIcon from '@/assets/Logos & Icons/FB Icon.svg';
import igIcon from '@/assets/Logos & Icons/IG Icon.svg';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/locations', label: 'Locations' },
  { to: '/classes', label: 'Classes' },
  { to: '/training', label: 'Training' },
];

const mobileNavItems = [
  ...navItems,
  { to: '/memberships', label: 'Memberships' },
  { to: '/schedule', label: 'Schedule' },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `site-nav-link ${isActive ? 'site-nav-link-active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-os-paper text-os-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-os-black text-white lg:h-24">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:h-full lg:px-8 lg:py-0">
          <Link to="/" className="flex items-center gap-3 lg:-mb-7 lg:mt-2 lg:self-start">
            <img src={logo} alt="Optimal Sport Health Clubs" className="h-16 w-auto object-contain lg:h-24 lg:drop-shadow-2xl" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-7">{desktopLinks}</nav>
            <div className="flex items-center gap-3 border-l border-white/15 pl-6">
              <Link to="/schedule" className="icon-cta" aria-label="Schedule">
                <CalendarDays className="h-5 w-5" />
              </Link>
              <Link to="/memberships" className="site-button site-button-small">
                Join
              </Link>
            </div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-white/10 bg-os-black p-0 text-white">
              <div className="border-b border-white/10 p-5">
                <img src={logo} alt="Optimal Sport Health Clubs" className="h-16 object-contain" />
              </div>
              <nav className="flex flex-col gap-1 p-5">{mobileLinks}</nav>
              <div className="grid gap-3 p-5">
                <Link to="/schedule" className="site-button justify-center">
                  View Schedule
                </Link>
                <Link to="/memberships" className="site-button-secondary justify-center">
                  Memberships
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-os-black px-5 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <img src={logo} alt="Optimal Sport Health Clubs" className="h-20 object-contain" />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Serious fitness, strong coaching, and two Philadelphia-area clubs built around the way members actually train
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.facebook.com/OptimalSport1315" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                <span className="social-icon" style={{ maskImage: `url(${fbIcon})`, WebkitMaskImage: `url(${fbIcon})` }} />
              </a>
              <a href="https://www.instagram.com/optimalnation/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <span className="social-icon" style={{ maskImage: `url(${igIcon})`, WebkitMaskImage: `url(${igIcon})` }} />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <h2 className="footer-heading">Start Here</h2>
            <Link to="/locations" className="footer-link"><MapPin className="h-4 w-4" /> Choose a location</Link>
            <Link to="/schedule" className="footer-link"><CalendarDays className="h-4 w-4" /> View schedules</Link>
            <Link to="/training" className="footer-link"><Dumbbell className="h-4 w-4" /> Meet trainers</Link>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <h2 className="footer-heading">Membership</h2>
            <Link to="/memberships" className="footer-link"><Ticket className="h-4 w-4" /> Compare plans</Link>
            <a href="tel:+12157351114" className="footer-link">Center City: 215.735.1114</a>
            <a href="tel:+12155797600" className="footer-link">Newtown: 215.579.7600</a>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:justify-between">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Optimal Sport Health Clubs</p>
            <p>
              Designed and deployed by{' '}
              <a href="https://tryshipyard.vercel.app" target="_blank" rel="noopener" className="credit-link">
                Arseni Sutton
              </a>
            </p>
          </div>
          <Link to="/privacy-terms" className="credit-link self-start">Privacy & Terms</Link>
        </div>
      </footer>
    </div>
  );
}
