import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Bluesky Video Downloader',
  description: 'Paste a Bluesky link, grab the video and thumbnail instantly.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full text-slate-900`}>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3VRYPMT8S3" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3VRYPMT8S3', { anonymize_ip: true });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
