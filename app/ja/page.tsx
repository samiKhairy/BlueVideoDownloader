import Link from 'next/link';
import type { Metadata } from 'next';
import React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Bluesky 動画・GIFダウンローダー — 無料・透かしなし (2026)',
  description: 'Blueskyの動画やGIFをMP4として無料でダウンロード。透かしなし、登録不要。iPhone、Android、PCで動作。',
  alternates: {
    canonical: '/ja',
    languages: { 'x-default': '/', en: '/', pt: '/pt', es: '/es', de: '/de', fr: '/fr', id: '/id', ja: '/ja' }
  },
  openGraph: {
    title: 'Bluesky 動画・GIFダウンローダー — 無料・透かしなし',
    description: 'Blueskyの動画やGIFをMP4として無料でダウンロード。透かしなし、登録不要。iPhone、Android、PCで動作。',
    url: 'https://bluevideosaver.com/ja',
    siteName: 'BlueVideoSaver'
  }
};

const faqs = [
  {
    question: 'iPhone での動画保存方法',
    answer: '投稿リンクをコピーし、Safariでbluevideosaver.comを開き、ボックスに貼り付けてDownloadをタップします。MP4を「ファイル」または「写真」に保存します。'
  },
  {
    question: 'Android での保存方法',
    answer: 'リンクをコピーし、Chromeでbluevideosaver.comを開き、貼り付けてDownloadをタップします。ファイルはダウンロードフォルダに保存されます。'
  },
  {
    question: 'GIF のダウンロード方法',
    answer: 'はい。BlueskyはGIFを短いループ動画として表示します。BlueVideoSaverはそれらをどのデバイスでも動作するMP4ファイルとしてダウンロードします。'
  },
  {
    question: '音声なし問題の解決方法',
    answer: '一部のツールは音声トラックを無視します。BlueVideoSaverは音声と動画の両方が存在する場合、それらを自動的に結合します。'
  },
  {
    question: '無料で使えるか',
    answer: 'はい。完全に無料で、登録は不要です。ブラウザ上で直接動作します。'
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

export default function JaPage(): React.ReactElement {
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
            <Link href="/id" className="text-slate-500 hover:text-sky-700 transition">Indonesia</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">日本語</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bluesky 動画・GIFダウンローダー
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Blueskyの公開投稿リンクを貼り付けて、動画やGIFをMP4としてダウンロードします。
            無料、透かしなし、すべてのデバイスで動作します。
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
            { label: '透かしなし', detail: '元の画質を維持' },
            { label: '登録不要', detail: 'ブラウザで即座に動作' },
            { label: '音声付き', detail: '音声と動画を自動で結合' }
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
          <h2 className="text-xl font-semibold mb-5">Blueskyの動画をダウンロードする方法</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'リンクをコピー', desc: 'Blueskyを開き、動画またはGIFを含む投稿を見つけ、3つのドットをタップしてリンクをコピーします。' },
              { step: '2', title: '貼り付けて抽出', desc: '上のボックスにリンクを貼り付け、Downloadをクリックします。BlueVideoSaverが最適な画質を見つけます。' },
              { step: '3', title: 'デバイスに保存', desc: 'フォーマット（動画、GIF、またはサムネイル）を選択し、ファイルをダウンロードします。' }
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

      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">よくある質問</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />    </>
  );
}
