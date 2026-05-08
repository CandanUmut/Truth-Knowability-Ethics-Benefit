import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/common/Logo';
import { LangSwitch } from '@/components/common/LangSwitch';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/method', key: 'method' as const },
  { to: '/sources', key: 'sources' as const },
  { to: '/deliberate', key: 'deliberate' as const },
  { to: '/history', key: 'history' as const },
  { to: '/about', key: 'about' as const },
];

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-landing px-6 h-16 flex items-center justify-between gap-6">
        <Logo />
        <nav
          aria-label={t('nav.primary', { defaultValue: 'Primary' })}
          className="hidden md:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-sm rounded-full transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
