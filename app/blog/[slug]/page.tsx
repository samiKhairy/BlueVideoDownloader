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

  return (
    <main className="min-h-screen px-4 py-10">
      <article className="max-w-3xl mx-auto prose prose-sm md:prose-base">
        <h1>{post.title}</h1>
        <Body />
        <hr className="my-6" />
        <p className="text-sm text-gray-600">
          Use{' '}
          <a href="https://bluevideosaver.com" className="underline">
            BlueVideoSaver
          </a>{' '}
          to download any public Bluesky video or GIF as an MP4 file.
        </p>
      </article>
    </main>
  );
}
