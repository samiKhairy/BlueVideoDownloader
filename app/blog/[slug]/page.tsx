import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type React from 'react';

import { BLOG_POST_MAP, BLOG_POSTS } from '../posts';

type BlogPageParams = {
  params: { slug: string };
};

export function generateMetadata({ params }: BlogPageParams): Metadata {
  const post = BLOG_POST_MAP.get(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  };
}

export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: BlogPageParams): React.ReactElement {
  const post = BLOG_POST_MAP.get(params.slug);

  if (!post) {
    return notFound();
  }

  const Body = post.body;

  // Slugs reported as duplicate FAQPages in GSC. We suppress the schema on these
  // pages to consolidate the SEO signal on fewer, higher-priority pages.
  const DUPLICATE_FAQ_SLUGS = [
    'download-bluesky-video-chromebook',
    'download-bluesky-video-android',
    'save-bluesky-video-offline',
    'bluesky-gif-downloader'
  ];

  const shouldSuppressFaqSchema = DUPLICATE_FAQ_SLUGS.includes(params.slug);

  const faqJsonLd =
    post.faqs.length > 0 && !shouldSuppressFaqSchema
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      : null;

  return (
    <main className="min-h-screen px-4 py-10">
      <article className="max-w-3xl mx-auto prose prose-sm md:prose-base">
        <h1>{post.title}</h1>
        <Body />
        {post.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <dl className="mt-4 space-y-4 text-sm md:text-base text-gray-800">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <dt className="font-semibold">{faq.question}</dt>
                  <dd className="leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <hr className="my-6" />
        <p className="text-sm text-gray-600">
          Use{' '}
          <a href="https://bluevideosaver.com" className="underline">
            BlueVideoSaver
          </a>{' '}
          to download any public Bluesky video or GIF as an MP4 file.
        </p>
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </article>
    </main>
  );
}
