type LoadingSpinnerSize = "small" | "medium" | "large";

type LoadingSpinnerProps = {
  size?: LoadingSpinnerSize;
  className?: string;
};

type InlineLoadingProps = LoadingSpinnerProps & {
  label: string;
};

export function LoadingSpinner({
  size = "medium",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <span
      className={`loading-spinner loading-spinner--${size} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

export function InlineLoading({
  label,
  size = "medium",
  className = "",
}: InlineLoadingProps) {
  return (
    <div className={`inline-loading ${className}`.trim()} role="status">
      <LoadingSpinner size={size} />
      <span>{label}</span>
    </div>
  );
}

export function InitialLoadScreen() {
  return (
    <main className="initial-load-screen" role="status" aria-live="polite">
      <div className="initial-load-screen__content">
        <span className="initial-load-screen__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 6.5 12 2l9 4.5v11L12 22l-9-4.5v-11Z" />
            <path d="m3 6.5 9 5 9-5M12 11.5V22" />
          </svg>
        </span>
        <span className="initial-load-screen__name">PrepAi</span>
        <LoadingSpinner size="large" />
        <p>Getting your study space ready</p>
      </div>
    </main>
  );
}
