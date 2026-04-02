import Link from 'next/link';
import type { Metadata } from 'next';
import type React from 'react';
import { DownloadTool } from '../components/DownloadTool';

export const metadata: Metadata = {
  title: 'Baixar Vídeos do Bluesky — Download Grátis de Vídeos e GIFs (2026)',
  description:
    "Baixe vídeos e GIFs do Bluesky como MP4 grátis. Sem marca d'água, sem cadastro. Funciona no iPhone, Android e computador.",
  alternates: {
    canonical: '/pt',
    languages: { en: '/', pt: '/pt', es: '/es' }
  },
  openGraph: {
    title: "Baixar Vídeos do Bluesky — Grátis, Sem Marca D'Água",
    description:
      'Cole o link de qualquer post do Bluesky e salve o vídeo ou GIF como MP4. Funciona em todos os dispositivos.',
    url: 'https://bluevideosaver.com/pt',
    siteName: 'BlueVideoSaver'
  }
};

const faqs = [
  {
    question: 'Como baixar vídeos do Bluesky no iPhone?',
    answer:
      'Copie o link do post, abra bluevideosaver.com no Safari, cole na caixa, toque em Download e salve o MP4 em Arquivos ou Fotos.'
  },
  {
    question: 'Como baixar vídeos do Bluesky no Android?',
    answer:
      'Copie o link do post, abra o Chrome e acesse bluevideosaver.com, cole o link e toque em Download. O arquivo é salvo na pasta Downloads.'
  },
  {
    question: 'Posso baixar GIFs do Bluesky?',
    answer:
      'Sim. O Bluesky serve GIFs como vídeos curtos em loop. O BlueVideoSaver baixa como arquivos MP4 que funcionam em qualquer dispositivo.'
  },
  {
    question: 'Por que o vídeo baixado não tem som?',
    answer:
      'Algumas ferramentas ignoram a faixa de áudio. O BlueVideoSaver detecta e combina áudio e vídeo quando ambos existem.'
  },
  {
    question: 'O BlueVideoSaver é gratuito?',
    answer:
      'Sim. É gratuito, não precisa de cadastro e funciona diretamente no navegador.'
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
  name: 'Como baixar vídeos do Bluesky',
  description: 'Salve qualquer vídeo ou GIF público do Bluesky como MP4 usando o BlueVideoSaver.',
  inLanguage: 'pt',
  step: [
    { '@type': 'HowToStep', name: 'Copie o link do post', text: 'Abra o Bluesky, encontre o post com o vídeo ou GIF, toque nos três pontos e copie o link.' },
    { '@type': 'HowToStep', name: 'Cole o link', text: 'Acesse bluevideosaver.com e cole o link na caixa de download.' },
    { '@type': 'HowToStep', name: 'Baixe o MP4', text: 'Clique em Download e salve o arquivo MP4 no seu dispositivo.' }
  ]
};

export default function PtPage(): React.ReactElement {
  return (
    <>
      <section className="px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="flex justify-center gap-3 text-sm">
            <Link href="/" className="text-slate-500 hover:text-sky-700 transition">English</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-sky-700">Português</span>
            <span className="text-slate-300">|</span>
            <Link href="/es" className="text-slate-500 hover:text-sky-700 transition">Español</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Baixar Vídeos e GIFs do Bluesky
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto">
            Cole o link de qualquer post público do Bluesky para baixar o vídeo ou GIF como MP4.
            Grátis, sem marca d&apos;água, funciona em todos os dispositivos.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10">
        <DownloadTool />
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Sem marca d'água", detail: 'Qualidade original preservada' },
            { label: 'Sem cadastro', detail: 'Funciona direto no navegador' },
            { label: 'Com áudio', detail: 'Combina áudio e vídeo automaticamente' }
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
          <h2 className="text-xl font-semibold mb-5">Como baixar vídeos do Bluesky</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Copie o link do post', desc: 'Abra o Bluesky, encontre o post com o vídeo ou GIF, toque nos três pontos e copie o link.' },
              { step: '2', title: 'Cole e extraia', desc: 'Cole o link acima e clique em Download. O BlueVideoSaver encontra a melhor qualidade disponível.' },
              { step: '3', title: 'Salve no seu dispositivo', desc: 'Escolha o formato — Vídeo, GIF ou Miniatura — e baixe o arquivo.' }
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
          <h2 className="text-xl font-semibold mb-5">Por que usar o BlueVideoSaver</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'GIFs do Bluesky suportados', desc: 'O Bluesky serve GIFs como vídeos curtos em loop. Baixamos como MP4 que funciona em qualquer dispositivo.' },
              { title: 'Áudio e vídeo combinados', desc: 'Muitas ferramentas retornam arquivos sem som. Nós combinamos as faixas de áudio e vídeo automaticamente.' },
              { title: "Sem marca d'água", desc: 'O stream original é salvo diretamente — sem sobreposições, sem perda de qualidade.' },
              { title: 'Funciona em todos os dispositivos', desc: 'iPhone, Android, iPad, Windows, Mac, Chromebook — tudo funciona no seu navegador.' }
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
          <h2 className="text-xl font-semibold mb-5">Perguntas frequentes</h2>
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
