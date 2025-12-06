import Image from 'next/image';
import type React from 'react';

type LogoHeaderProps = {
    className?: string;
};

export function LogoHeader({ className }: LogoHeaderProps): React.ReactElement {
    return (
        <div className={['shrink-0', className].filter(Boolean).join(' ')}>
            <Image
                src="/android-chrome-192x192.png"
                alt="BlueVideoSaver logo"
                width={128}
                height={128}
                priority
            />
        </div>
    );
}