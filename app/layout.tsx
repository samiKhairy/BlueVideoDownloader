import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-display'
});

function getPageLang(): string {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';
  if (pathname.startsWith('/pt')) return 'pt';
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/de')) return 'de';
  if (pathname.startsWith('/fr')) return 'fr';
  if (pathname.startsWith('/id')) return 'id';
  return 'en';
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'BlueVideoSaver',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web, iOS, Android, Windows, macOS',
  description:
    'Free video downloader for Bluesky, Twitter/X, and TikTok. Save social media videos as MP4 with no watermark.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export const metadata: Metadata = {
  title: 'Video Downloader — Bluesky, Twitter/X & TikTok – Free, No Watermark (2026)',
  description:
    'Download videos from Bluesky, Twitter/X, and TikTok as MP4 for free. No watermark, no signup. Works on iPhone, Android, and desktop.',
  metadataBase: new URL('https://bluevideosaver.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'pt': '/pt',
      'es': '/es',
      'de': '/de',
      'fr': '/fr',
      'id': '/id',
      'ja': '/ja'
    }
  },
  openGraph: {
    title: 'Video Downloader — Bluesky, Twitter/X & TikTok – Free, No Watermark',
    description:
      'Paste any video URL from Bluesky, Twitter/X, or TikTok and save it as MP4. Works on iPhone, Android, and desktop.',
    url: 'https://bluevideosaver.com/',
    siteName: 'BlueVideoSaver'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Downloader — Bluesky, Twitter/X & TikTok – Free, No Watermark',
    description:
      'Save videos from Bluesky, Twitter/X, and TikTok as MP4. No watermark, no signup. Works on all devices.'
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

import { Toaster } from 'sonner';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang={getPageLang()} className={`h-full ${inter.variable} ${bricolage.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="font-sans flex min-h-full flex-col text-ink bg-dawn dark:bg-night dark:text-[#eceef1]">
        <Toaster position="bottom-right" />
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
