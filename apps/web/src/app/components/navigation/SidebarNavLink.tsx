import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AppIcon } from '../ui/AppIcon';

type SidebarNavLinkProps = {
  active?: boolean;
  badgeCount?: number;
  collapsed?: boolean;
  className?: string;
  href?: string;
  iconName: string;
  iconClassName?: string;
  iconDataIcon?: string;
  iconStyle?: CSSProperties;
  label: string;
  onClick?: () => void;
  labelClassName?: string;
  to?: string;
};

export function SidebarNavLink({
  active = false,
  badgeCount,
  collapsed = false,
  className = '',
  href = '#',
  iconName,
  iconClassName = 'material-symbols-outlined',
  iconDataIcon,
  iconStyle,
  label,
  onClick,
  labelClassName = 'font-semibold text-sm',
  to,
}: SidebarNavLinkProps) {
  const mergedClassName =
    `relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
      active
        ? 'bg-primary text-on-primary'
        : 'text-on-surface hover:bg-primary hover:text-on-primary'
    } ${collapsed ? 'justify-center' : ''} ${className}`.trim();

  const content = (
    <>
      <AppIcon
        className={iconClassName}
        data-icon={iconDataIcon}
        style={iconStyle}
      >
        {iconName}
      </AppIcon>
      {collapsed ? null : (
        <>
          <span className={labelClassName}>{label}</span>
          {badgeCount && badgeCount > 0 ? (
            <span
              className={`ml-auto inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                active
                  ? 'bg-on-primary text-primary'
                  : 'bg-primary text-on-primary'
              }`}
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          ) : null}
        </>
      )}
      {collapsed && badgeCount && badgeCount > 0 ? (
        <span className="absolute right-2 top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link className={mergedClassName} onClick={onClick} title={label} to={to}>
        {content}
      </Link>
    );
  }

  return (
    <a className={mergedClassName} href={href} onClick={onClick} title={label}>
      {content}
    </a>
  );
}
