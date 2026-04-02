import Link from 'next/link';
import type { Metadata } from 'next';
import type React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Descargar Vídeos de Bluesky — Gratis, Sin Marca de Agua (2026)',
  description:
    'Descarga vídeos y GIFs de Bluesky como MP4 gratis. Sin marca de agua, sin registro. Funciona en iPhone, Android y computadora.',
  alternates: {
    canonical: '/es',
    languages: { en: '/', pt: '/pt', es: '/es' }
  },
  openGraph: {
    title: 'Descargar Vídeos de Bluesky — Gratis, Sin Marca de Agua',
    description:
      'Pega el enlace de cualquier publicación de Bluesky y guarda el vídeo o GIF como MP4. Funciona en todos los dispositivos.',
    url: 'https://bluevideosaver.com/es',
    siteName: 'BlueVideoSaver'
  }
};

const faqs = [
  {
    question: '¿Cómo descargar vídeos de Bluesky en iPhone?',
    answer:
      'Copia el enlace de la publicación, abre bluevideosaver.com en Safari, pega en la caja, toca Download y guarda el MP4 en Archivos o Fotos.'
  },
  {
    question: '¿Cómo descargar vídeos de Bluesky en Android?',
    answer:
      'Copia el enlace, abre Chrome y ve a bluevideosaver.com, pega el enlace y toca Download. El archivo se guarda en la carpeta Descargas.'
  },
  {
    question: '¿Puedo descargar GIFs de Bluesky?',
    answer:
      'Sí. Bluesky muestra GIFs como vídeos cortos en bucle. BlueVideoSaver los descarga como archivos MP4 que funcionan en cualquier dispositivo.'
  },
  {
    question: '¿Por qué el vídeo descargado no tiene sonido?',
    answer:
      'Algunas herramientas ignoran la pista de audio. BlueVideoSaver detecta y combina audio y vídeo cuando ambos existen.'
  },
  {
    question: '¿BlueVideoSaver es gratuito?',
    answer:
      'Sí. Es gratuito, no necesita registro y funciona directamente en el navegador.'
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
  name: 'Cómo descargar vídeos de Bluesky',
  description: 'Guarda cualquier vídeo o GIF público de Bluesky como MP4 usando BlueVideoSaver.',
  inLanguage: 'es',
  step: [
    { '@type': 'HowToStep', name: 'Copia el enlace', text: 'Abre Bluesky, encuentra la publicación con el vídeo o GIF, toca los tres puntos y copia el enlace.' },
    { '@type': 'HowToStep', name: 'Pega el enlace', text: 'Ve a bluevideosaver.com y pega el enlace en la caja de descarga.' },
    { '@type': 'HowToStep', name: 'Descarga el MP4', text: 'Haz clic en Download y guarda el archivo MP4 en tu dispositivo.' }
  ]
};

export default function EsPage(): React.ReactElement {
  return (
    <>
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="flex justify-center gap-3 text-sm">
            <Link href="/" className="text-slate-500 hover:text-sky-700 transition">English</Link>
            <span className="text-slate-300">|</span>
            <Link href="/pt" className="text-slate-500 hover:text-sky-700 transition">Português</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">Español</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Descargar Vídeos y GIFs de Bluesky
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Pega el enlace de cualquier publicación pública de Bluesky para descargar el vídeo o GIF como MP4.
            Gratis, sin marca de agua, funciona en todos los dispositivos.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10">
        <DownloadTool />
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Sin marca de agua', detail: 'Calidad original preservada' },
            { label: 'Sin registro', detail: 'Funciona directo en el navegador' },
            { label: 'Con audio', detail: 'Combina audio y vídeo automáticamente' }
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
          <h2 className="text-xl font-semibold mb-5">Cómo descargar vídeos de Bluesky</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Copia el enlace', desc: 'Abre Bluesky, encuentra la publicación con el vídeo o GIF, toca los tres puntos y copia el enlace.' },
              { step: '2', title: 'Pega y extrae', desc: 'Pega el enlace arriba y haz clic en Download. BlueVideoSaver encuentra la mejor calidad disponible.' },
              { step: '3', title: 'Guarda en tu dispositivo', desc: 'Elige el formato — Vídeo, GIF o Miniatura — y descarga el archivo.' }
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
          <h2 className="text-xl font-semibold mb-5">¿Por qué usar BlueVideoSaver?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'GIFs de Bluesky soportados', desc: 'Bluesky muestra GIFs como vídeos cortos en bucle. Los descargamos como MP4 que funcionan en cualquier dispositivo.' },
              { title: 'Audio y vídeo combinados', desc: 'Muchas herramientas devuelven archivos sin sonido. Nosotros combinamos las pistas de audio y vídeo automáticamente.' },
              { title: 'Sin marca de agua', desc: 'El stream original se guarda directamente — sin superposiciones, sin pérdida de calidad.' },
              { title: 'Funciona en todos los dispositivos', desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — todo funciona en tu navegador.' }
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
          <h2 className="text-xl font-semibold mb-5">Preguntas frecuentes</h2>
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
