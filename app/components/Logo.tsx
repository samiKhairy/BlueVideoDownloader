import Image from 'next/image';
import React from 'react';

interface LogoProps {
    readonly className?: string;
}

const baseClasses =
    'fixed left-4 top-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-white/85 px-3 py-2 shadow-sm backdrop-blur';

export const Logo = React.memo(function Logo({ className }: LogoProps): React.ReactElement {
    return (
        <div className={`${baseClasses} ${className ?? ''}`} aria-label="BlueVideoSaver branding" role="banner">
            <Image
                src="/android-chrome-192x192.png"
                alt="BlueVideoSaver logo"
                width={40}
                height={40}
                priority
            />
            <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900">BlueVideoSaver</p>
                <p className="text-xs text-slate-600">Bluesky Video Downloader</p>
            </div>
        </div>
    );
});