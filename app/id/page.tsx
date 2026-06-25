import Link from 'next/link';
import type { Metadata } from 'next';
import React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Download Video Bluesky — Gratis, Tanpa Watermark (2026)',
  description: 'Download video dan GIF Bluesky sebagai MP4 gratis. Tanpa watermark, tanpa daftar. Berfungsi di iPhone, Android, dan desktop.',
  alternates: { canonical: '/id', languages: { 'x-default': '/', en: '/', pt: '/pt', es: '/es', de: '/de', fr: '/fr', id: '/id', ja: '/ja' } },
  openGraph: { title: 'Download Video Bluesky — Gratis, Tanpa Watermark', url: 'https://bluevideosaver.com/id', siteName: 'BlueVideoSaver' }
};

const faqs = [
  { question: 'Bagaimana cara download video Bluesky di iPhone?', answer: 'Salin link postingan, buka bluevideosaver.com di Safari, tempel di kolom, ketuk Download dan simpan MP4 ke File atau Foto.' },
  { question: 'Bisakah saya download GIF dari Bluesky?', answer: 'Ya. Bluesky menampilkan GIF sebagai video pendek berulang. BlueVideoSaver mendownloadnya sebagai file MP4.' },
  { question: 'Kenapa video yang didownload tidak ada suaranya?', answer: 'BlueVideoSaver mendeteksi dan menggabungkan audio dan video secara otomatis.' },
  { question: 'Apakah BlueVideoSaver gratis?', answer: 'Ya. Gratis, tanpa perlu daftar, langsung di browser.' }
];

const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
export default function IdPage(): React.ReactElement {
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
            <Link href="/fr" className="text-slate-500 hover:text-sky-700 transition">Français</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">Indonesia</span>
            <span className="text-slate-300">|</span>
            <Link href="/ja" className="text-slate-500 hover:text-sky-700 transition">日本語</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Download Video & GIF Bluesky</h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">Tempel link postingan publik Bluesky untuk download video atau GIF sebagai MP4. Gratis, tanpa watermark.</p>
        </div>
      </section>
      <section className="px-4 pb-10"><React.Suspense fallback={<div className="text-center py-20">Memuat...</div>}><DownloadTool /></React.Suspense></section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[{ label: 'Tanpa watermark', detail: 'Kualitas asli terjaga' }, { label: 'Tanpa daftar', detail: 'Langsung di browser' }, { label: 'Dengan audio', detail: 'Audio dan video digabung otomatis' }].map((item) => (
            <div key={item.label} className="py-4 px-3 rounded-xl bg-white border border-slate-100"><p className="text-sm font-semibold text-slate-900">{item.label}</p><p className="text-xs text-slate-500 mt-1">{item.detail}</p></div>
          ))}
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Cara download video Bluesky</h2>
          <ol className="space-y-4">
            {[{ step: '1', title: 'Salin link postingan', desc: 'Buka Bluesky, cari postingan dengan video atau GIF, ketuk tiga titik dan salin link.' }, { step: '2', title: 'Tempel dan ekstrak', desc: 'Tempel link di atas dan klik Download. BlueVideoSaver menemukan kualitas terbaik.' }, { step: '3', title: 'Simpan di perangkat', desc: 'Pilih format — Video, GIF atau Thumbnail — dan download file-nya.' }].map((item) => (
              <li key={item.step} className="flex gap-4 items-start"><span className="shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold flex items-center justify-center">{item.step}</span><div><p className="font-medium text-slate-900">{item.title}</p><p className="text-sm text-slate-600 mt-0.5">{item.desc}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Kenapa BlueVideoSaver?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[{ title: 'GIF Bluesky didukung', desc: 'GIF Bluesky didownload sebagai MP4 yang kompatibel.' }, { title: 'Audio digabung', desc: 'Kami menggabungkan audio dan video secara otomatis.' }, { title: 'Tanpa watermark', desc: 'Stream asli disimpan langsung tanpa modifikasi.' }, { title: 'Semua perangkat', desc: 'iPhone, Android, Windows, Mac — semua di browser.' }].map((f) => (
              <div key={f.title} className="p-4 rounded-xl bg-white border border-slate-100"><p className="font-medium text-slate-900 text-sm">{f.title}</p><p className="text-sm text-slate-600 mt-1">{f.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Pertanyaan yang sering diajukan</h2>
          <dl className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"><dt className="font-medium text-sm text-slate-900">{faq.question}</dt><dd className="mt-1 text-sm text-slate-600">{faq.answer}</dd></div>))}</dl>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />    </>
  );
}
