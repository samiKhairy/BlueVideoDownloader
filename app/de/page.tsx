import Link from 'next/link';
import type { Metadata } from 'next';
import React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Bluesky Video Downloader — Kostenlos Bluesky Videos & GIFs herunterladen (2026)',
  description:
    'Lade Bluesky Videos und GIFs kostenlos als MP4 herunter. Kein Wasserzeichen, keine Anmeldung. Funktioniert auf iPhone, Android und Desktop.',
  alternates: {
    canonical: '/de',
    languages: { en: '/', pt: '/pt', es: '/es', de: '/de', fr: '/fr', id: '/id' }
  },
  openGraph: {
    title: 'Bluesky Video Downloader — Kostenlos, Ohne Wasserzeichen',
    description:
      'Füge den Link eines Bluesky-Beitrags ein und speichere das Video oder GIF als MP4. Funktioniert auf allen Geräten.',
    url: 'https://bluevideosaver.com/de',
    siteName: 'BlueVideoSaver'
  }
};

const faqs = [
  {
    question: 'Wie lade ich Bluesky-Videos auf dem iPhone herunter?',
    answer:
      'Kopiere den Post-Link, öffne bluevideosaver.com in Safari, füge ihn in das Feld ein, tippe auf Download und speichere die MP4-Datei in Dateien oder Fotos.'
  },
  {
    question: 'Wie lade ich Bluesky-Videos auf Android herunter?',
    answer:
      'Kopiere den Post-Link, öffne Chrome und gehe zu bluevideosaver.com, füge den Link ein und tippe auf Download. Die Datei wird im Download-Ordner gespeichert.'
  },
  {
    question: 'Kann ich Bluesky-GIFs herunterladen?',
    answer:
      'Ja. Bluesky zeigt GIFs als kurze Video-Loops an. BlueVideoSaver lädt sie als MP4-Dateien herunter, die auf jedem Gerät funktionieren.'
  },
  {
    question: 'Warum hat das heruntergeladene Video keinen Ton?',
    answer:
      'Einige Tools ignorieren die Audiospur. BlueVideoSaver erkennt und kombiniert Audio und Video, wenn beides vorhanden ist.'
  },
  {
    question: 'Ist BlueVideoSaver kostenlos?',
    answer:
      'Ja. Es ist kostenlos, erfordert keine Anmeldung und funktioniert direkt im Browser.'
  }
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'So lädst du Bluesky-Videos herunter',
  description: 'Speichere jedes öffentliche Bluesky-Video oder GIF als MP4 mit BlueVideoSaver.',
  inLanguage: 'de',
  step: [
    { '@type': 'HowToStep', name: 'Link kopieren', text: 'Öffne Bluesky, finde den Beitrag mit dem Video oder GIF, tippe auf die drei Punkte und kopiere den Link.' },
    { '@type': 'HowToStep', name: 'Link einfügen', text: 'Gehe zu bluevideosaver.com und füge den Link in das Download-Feld ein.' },
    { '@type': 'HowToStep', name: 'MP4 herunterladen', text: 'Klicke auf Download und speichere die MP4-Datei auf deinem Gerät.' }
  ]
};

export default function DePage(): React.ReactElement {
  return (
    <>
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="flex justify-center gap-3 text-sm flex-wrap">
            <Link href="/" className="text-slate-500 hover:text-sky-700 transition">English</Link>
            <span className="text-slate-300">|</span>
            <Link href="/pt" className="text-slate-500 hover:text-sky-700 transition">Português</Link>
            <span className="text-slate-300">|</span>
            <Link href="/es" className="text-slate-500 hover:text-sky-700 transition">Español</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">Deutsch</span>
            <span className="text-slate-300">|</span>
            <Link href="/fr" className="text-slate-500 hover:text-sky-700 transition">Français</Link>
            <span className="text-slate-300">|</span>
            <Link href="/id" className="text-slate-500 hover:text-sky-700 transition">Indonesia</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bluesky Videos & GIFs herunterladen
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Füge den Link eines öffentlichen Bluesky-Beitrags ein, um das Video oder GIF als MP4 herunterzuladen.
            Kostenlos, ohne Wasserzeichen, funktioniert auf allen Geräten.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10">
        <React.Suspense fallback={<div className="text-center py-20">Loading tool...</div>}>
          <DownloadTool />
        </React.Suspense>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Kein Wasserzeichen', detail: 'Originalqualität bleibt erhalten' },
            { label: 'Keine Anmeldung', detail: 'Funktioniert sofort im Browser' },
            { label: 'Mit Audio', detail: 'Audio und Video automatisch zusammengeführt' }
          ].map((item) => (
            <div key={item.label} className="py-4 px-3 rounded-xl bg-white border border-slate-100">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">So lädst du Bluesky-Videos herunter</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Link kopieren', desc: 'Öffne Bluesky, finde den Beitrag mit dem Video oder GIF, tippe auf die drei Punkte und kopiere den Link.' },
              { step: '2', title: 'Einfügen und extrahieren', desc: 'Füge den Link oben ein und klicke auf Download. BlueVideoSaver findet die beste verfügbare Qualität.' },
              { step: '3', title: 'Auf deinem Gerät speichern', desc: 'Wähle das Format — Video, GIF oder Vorschaubild — und lade die Datei herunter.' }
            ].map((item) => (
              <li key={item.step} className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold flex items-center justify-center">{item.step}</span>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Warum BlueVideoSaver?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Bluesky-GIFs unterstützt', desc: 'Bluesky zeigt GIFs als kurze Video-Loops. Wir laden sie als MP4 herunter, die auf jedem Gerät funktionieren.' },
              { title: 'Audio und Video zusammengeführt', desc: 'Viele Tools liefern stumme Dateien. Wir fügen Audio- und Videospuren automatisch zusammen.' },
              { title: 'Kein Wasserzeichen', desc: 'Der Originalstream wird direkt gespeichert — keine Overlays, kein Qualitätsverlust.' },
              { title: 'Funktioniert auf allen Geräten', desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — alles läuft in deinem Browser.' }
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-white border border-slate-100">
                <p className="font-medium text-slate-900 text-sm">{f.title}</p>
                <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Häufig gestellte Fragen</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <dt className="font-medium text-sm text-slate-900">{faq.question}</dt>
                <dd className="mt-1 text-sm text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </>
  );
}
