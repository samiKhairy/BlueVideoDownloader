import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BlueVideoSaver',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web, iOS, Android, Windows, macOS',
  description:
    'Web-based Bluesky video downloader to save Bluesky videos and GIFs as MP4, no watermark.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export const metadata: Metadata = {
  title: 'Bluesky Video Downloader – Download Bluesky Videos & GIFs (Free)',
  description:
    'BlueVideoSaver lets you download Bluesky videos and GIFs as MP4, no watermark. Works on iPhone, Android, and desktop – free and fast.',
  metadataBase: new URL('https://bluevideosaver.com'),
  alternates: {
    canonical: '/'
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
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
