import Link from 'next/link';
import type { Metadata } from 'next';
import React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Télécharger des Vidéos Bluesky — Gratuit, Sans Filigrane (2026)',
  description: 'Téléchargez des vidéos et GIFs Bluesky en MP4 gratuitement. Sans filigrane, sans inscription.',
  alternates: { canonical: '/fr', languages: { 'x-default': '/', en: '/', pt: '/pt', es: '/es', de: '/de', fr: '/fr', id: '/id', ja: '/ja' } },
  openGraph: { title: 'Télécharger des Vidéos Bluesky — Gratuit', url: 'https://bluevideosaver.com/fr', siteName: 'BlueVideoSaver' }
};

const faqs = [
  { question: 'Comment télécharger des vidéos Bluesky sur iPhone ?', answer: 'Copiez le lien, ouvrez bluevideosaver.com dans Safari, collez et appuyez sur Download.' },
  { question: 'Puis-je télécharger des GIFs Bluesky ?', answer: 'Oui. Bluesky affiche les GIFs comme de courtes vidéos en boucle. BlueVideoSaver les télécharge en MP4.' },
  { question: 'Pourquoi la vidéo n\'a pas de son ?', answer: 'BlueVideoSaver détecte et combine audio et vidéo automatiquement.' },
  { question: 'BlueVideoSaver est-il gratuit ?', answer: 'Oui. Gratuit, sans inscription, directement dans le navigateur.' }
];

const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
export default function FrPage(): React.ReactElement {
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
            <Link href="/de" className="text-slate-500 hover:text-sky-700 transition">Deutsch</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">Français</span>
            <span className="text-slate-300">|</span>
            <Link href="/id" className="text-slate-500 hover:text-sky-700 transition">Indonesia</Link>
            <span className="text-slate-300">|</span>
            <Link href="/ja" className="text-slate-500 hover:text-sky-700 transition">日本語</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Télécharger des Vidéos et GIFs Bluesky</h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">Collez le lien de n&apos;importe quelle publication Bluesky pour télécharger la vidéo ou le GIF en MP4. Gratuit, sans filigrane.</p>
        </div>
      </section>
      <section className="px-4 pb-10"><React.Suspense fallback={<div className="text-center py-20">Loading...</div>}><DownloadTool /></React.Suspense></section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[{ label: 'Sans filigrane', detail: 'Qualité originale' }, { label: 'Sans inscription', detail: 'Fonctionne dans le navigateur' }, { label: 'Avec audio', detail: 'Audio et vidéo combinés' }].map((item) => (
            <div key={item.label} className="py-4 px-3 rounded-xl bg-white border border-slate-100"><p className="text-sm font-semibold text-slate-900">{item.label}</p><p className="text-xs text-slate-500 mt-1">{item.detail}</p></div>
          ))}
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Comment télécharger des vidéos Bluesky</h2>
          <ol className="space-y-4">
            {[{ step: '1', title: 'Copiez le lien', desc: 'Ouvrez Bluesky, trouvez le post, copiez le lien.' }, { step: '2', title: 'Collez et extrayez', desc: 'Collez le lien ci-dessus et cliquez sur Download.' }, { step: '3', title: 'Sauvegardez', desc: 'Choisissez le format et téléchargez le fichier.' }].map((item) => (
              <li key={item.step} className="flex gap-4 items-start"><span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold flex items-center justify-center">{item.step}</span><div><p className="font-medium text-slate-900">{item.title}</p><p className="text-sm text-slate-600 mt-0.5">{item.desc}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Pourquoi BlueVideoSaver ?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[{ title: 'GIFs supportés', desc: 'Les GIFs Bluesky sont téléchargés en MP4 compatible.' }, { title: 'Audio combiné', desc: 'Nous fusionnons audio et vidéo automatiquement.' }, { title: 'Sans filigrane', desc: 'Le flux original est sauvegardé sans modification.' }, { title: 'Tous les appareils', desc: 'iPhone, Android, Windows, Mac — tout dans le navigateur.' }].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-white border border-slate-100"><p className="font-medium text-slate-900 text-sm">{f.title}</p><p className="text-sm text-slate-600 mt-1">{f.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Questions fréquentes</h2>
          <dl className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"><dt className="font-medium text-sm text-slate-900">{faq.question}</dt><dd className="mt-1 text-sm text-slate-600">{faq.answer}</dd></div>))}</dl>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />    </>
  );
}
