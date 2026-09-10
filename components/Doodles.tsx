type DoodleProps = {
  className?: string;
  strokeWidth?: number;
};

export function SmileyDoodle({ className, strokeWidth = 2.5 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 4.5C13.5 3.8 4.6 12.5 4.8 23.6 5 34.8 13.4 43.4 24.3 43.2 35.2 43 43.4 34.3 43.2 23.5 43 13 34.5 5.2 24 4.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M17 19.5c.1 1.4 0 2.1-.2 3.2M31.2 19.2c.1 1.4.1 2.2 0 3.3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15.5 29.5c2.3 3.3 5.4 5 8.8 4.9 3.3-.1 6.2-1.8 8.3-4.7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartDoodle({ className, strokeWidth = 2.5 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 38"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 33.5C13 27.6 6.2 22.3 4.6 15.8 3.4 10.7 6.2 6 10.8 5.4c3.8-.5 7.2 1.8 9 5.8 1.6-4.2 5.3-6.6 9.2-6 4.5.7 7.3 5.3 6.1 10.4-1.5 6.4-8.2 12-15.1 17.9Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UnderlineDoodle({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 180 12"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M4 8.2C34 4.6 62 4 90 4.8c30 .8 58 1.8 86 2.6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Two/three little marker emphasis strokes, like rays beside a heading. */
export function SparkDoodle({ className, strokeWidth = 3.5 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 34 30"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 26 16.5 15M18 27.5 24 19M27 12.5 31.5 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SunDoodle({ className, strokeWidth = 2.4 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="17" cy="18" r="5.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M17 7.5v-3M24 11l2-2M27.5 18h3M24 25l2 2M17 28.5v3M10 25l-2 2M6.5 18h-3M10 11 8 9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
