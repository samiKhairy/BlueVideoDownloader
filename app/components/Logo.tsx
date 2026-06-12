import React from 'react';

interface LogoProps {
  readonly className?: string;
}

/* Inline SVG mark: a Bluesky-blue butterfly whose body is a download arrow —
   "save Bluesky video" in one shape. Crisp at every size, no network request.
   Source of truth lives here and in /public/logo.svg (used by favicons). */
export const Logo = React.memo(function Logo({ className }: LogoProps): React.ReactElement {
  return (
    <svg
      viewBox="0 0 48 48"
      width={28}
      height={28}
      className={className}
      role="img"
      aria-label="BlueVideoSaver logo"
    >
      <g fill="#0A7AFF">
        <path d="M22.4 24C22.4 15 15.4 7.6 8 7.2 3.6 6.9 2.2 9.7 3.6 14c1.8 5.9 7.8 10.2 14.8 10.6C12.4 25.9 8.4 30.1 9.3 35.2c.8 4.5 5.9 3.8 8.8-1.2 1.9-3.2 3.3-6.7 4.3-10Z" />
        <path d="M25.6 24C25.6 15 32.6 7.6 40 7.2c4.4-.3 5.8 2.5 4.4 6.8-1.8 5.9-7.8 10.2-14.8 10.6 6 1.3 10 5.5 9.1 10.6-.8 4.5-5.9 3.8-8.8-1.2-1.9-3.2-3.3-6.7-4.3-10Z" />
      </g>
      <path d="M21.6 11.5h4.8v8.2h4.2L24 28l-6.6-8.3h4.2z" fill="#fff" />
    </svg>
  );
});
