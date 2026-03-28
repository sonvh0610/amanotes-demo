import { type CSSProperties, type ReactNode } from 'react';
import {
  AtSign,
  Award,
  Bell,
  Cake,
  CalendarDays,
  CheckCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  CirclePlus,
  CircleUser,
  Clock3,
  ClipboardCheck,
  Download,
  Ellipsis,
  FilePlus2,
  Filter,
  Gift,
  HandHeart,
  Heart,
  Home,
  ImagePlus,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquarePlus,
  Search,
  Send,
  SendHorizontal,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Smile,
  Sparkles,
  Star,
  TrendingUp,
  UserRoundCheck,
  UserRoundSearch,
  Users,
  Wallet,
  WandSparkles,
  X,
} from 'lucide-react';

type AppIconProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ['data-icon']?: string;
};

const ICONS = {
  account_balance_wallet: Wallet,
  add: FilePlus2,
  add_circle: CirclePlus,
  add_comment: MessageSquarePlus,
  add_shopping_cart: ShoppingCart,
  admin_panel_settings: UserRoundCheck,
  alternate_email: AtSign,
  arrow_forward: ChevronRight,
  attach_file: ImagePlus,
  bolt: WandSparkles,
  cake: Cake,
  celebration: Sparkles,
  chat_bubble: MessageCircle,
  check_circle: CheckCircle,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: X,
  comment: MessageSquare,
  dashboard: LayoutDashboard,
  done_all: CheckCheck,
  download: Download,
  error: CircleAlert,
  event: CalendarDays,
  favorite: Heart,
  filter_list: Filter,
  forum: MessageCircle,
  groups: Users,
  help: CircleHelp,
  home: Home,
  inventory_2: ClipboardCheck,
  lightbulb: Lightbulb,
  log_out: LogOut,
  menu: Menu,
  mood: Smile,
  more_horiz: Ellipsis,
  notifications: Bell,
  outbox: SendHorizontal,
  person: CircleUser,
  person_search: UserRoundSearch,
  redeem: Gift,
  rocket_launch: Send,
  schedule: Clock3,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  shopping_bag: ShoppingBag,
  stars: Star,
  trending_up: TrendingUp,
  tune: Filter,
  verified_user: UserRoundCheck,
  volunteer_activism: HandHeart,
  work_history: Award,
  workspace_premium: Award,
};

function sanitizeClassName(className: string) {
  return className
    .split(' ')
    .filter((token) => token && token !== 'material-symbols-outlined')
    .join(' ');
}

function getIconName(children: ReactNode, dataIcon?: string) {
  if (dataIcon?.trim()) {
    return dataIcon.trim();
  }

  if (typeof children === 'string') {
    return children.trim();
  }

  return '';
}

export function AppIcon({ children, className = '', style, ...rest }: AppIconProps) {
  const iconName = getIconName(children, rest['data-icon']);
  const Icon = ICONS[iconName as keyof typeof ICONS] ?? CircleHelp;
  const joinedClassName = sanitizeClassName(className);

  return (
    <Icon
      aria-hidden="true"
      className={joinedClassName}
      style={style}
      strokeWidth={2}
      {...rest}
    />
  );
}
