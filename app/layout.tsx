import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BlueVideoSaver',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web, iOS, Android, Windows, macOS',
  description:
    'Free Bluesky video and GIF downloader. Save Bluesky videos and GIFs as MP4 with no watermark.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export const metadata: Metadata = {
  title: 'Bluesky Video & GIF Downloader – Save Bluesky Videos Free (2026)',
  description:
    'Download Bluesky videos and GIFs as MP4 for free. No watermark, no signup. Works on iPhone, Android, and desktop. Fast and reliable.',
  metadataBase: new URL('https://bluevideosaver.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'pt': '/pt',
      'es': '/es'
    }
  },
  openGraph: {
    title: 'Bluesky Video & GIF Downloader – Free, No Watermark',
    description:
      'Paste any Bluesky post URL and save the video or GIF as MP4. Works on iPhone, Android, and desktop.',
    url: 'https://bluevideosaver.com/',
    siteName: 'BlueVideoSaver'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluesky Video & GIF Downloader – Free, No Watermark',
    description:
      'Save Bluesky videos and GIFs as MP4. No watermark, no signup. Works on all devices.'
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico' },
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { rel: 'icon', url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' }
    ],
    apple: [
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className={`${inter.className} flex min-h-full flex-col text-slate-900`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3VRYPMT8S3"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3VRYPMT8S3', { anonymize_ip: true });
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
