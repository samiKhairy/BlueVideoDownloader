import Image from 'next/image';
import React from 'react';

interface LogoProps {
  readonly className?: string;
}

export const Logo = React.memo(function Logo({ className }: LogoProps): React.ReactElement {
  return (
    <Image
      src="/android-chrome-192x192.png"
      alt="BlueVideoSaver logo"
      width={28}
      height={28}
      className={className}
      priority
    />
  );
});
