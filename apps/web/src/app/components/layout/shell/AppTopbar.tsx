import { Link } from 'react-router-dom';
import { AppIcon } from '../../ui/AppIcon';
import { GoodJobLogo } from '../../ui/GoodJobLogo';

type AppTopbarProps = {
  collapsed: boolean;
  onOpenMobileMenu: () => void;
  onToggleDesktopSidebar: () => void;
};

export function AppTopbar({
  collapsed,
  onOpenMobileMenu,
  onToggleDesktopSidebar,
}: AppTopbarProps) {
  const desktopSidebarWidth = collapsed ? 'lg:w-20' : 'lg:w-64';
  const desktopToggleLeft = collapsed ? 'lg:left-20' : 'lg:left-64';

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-white border-b border-slate-100 relative">
      <div className="h-full px-4 md:px-6 flex items-center justify-between lg:pl-6">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label="Open menu"
            className="inline-flex w-10 h-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            onClick={onOpenMobileMenu}
            type="button"
          >
            <AppIcon>menu</AppIcon>
          </button>
          <Link to="/">
            <GoodJobLogo className="h-10 w-auto" />
          </Link>
        </div>
        <div
          className={`hidden lg:flex h-full items-center gap-3 px-4 transition-all ${desktopSidebarWidth}`}
        >
          <Link to="/">
            <GoodJobLogo className="h-10 w-auto" />
          </Link>
        </div>
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`hidden lg:inline-flex absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-all ${desktopToggleLeft}`}
          onClick={onToggleDesktopSidebar}
          type="button"
        >
          <AppIcon>menu</AppIcon>
        </button>
        <div className="w-10" />
      </div>
    </header>
  );
}
