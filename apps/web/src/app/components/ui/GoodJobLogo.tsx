type GoodJobLogoProps = {
  className?: string;
  compact?: boolean;
};

export function GoodJobLogo({
  className = '',
  compact = false,
}: GoodJobLogoProps) {
  return (
    <img
      alt="Good Job logo"
      className={`h-10 w-auto ${className}`.trim()}
      src={compact ? '/goodjob-logo-icon.svg' : '/goodjob-logo.svg'}
    />
  );
}
