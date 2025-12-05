import Link from 'next/link';
import type React from 'react';

import { BLOG_POSTS } from './posts';

export default function BlogIndexPage(): React.ReactElement {
  return (
    <main className="min-h-screen px-4 py-10">
      <section className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Guides &amp; Tutorials</h1>
        <p className="text-sm md:text-base text-gray-600">
          Learn how to download Bluesky videos on different devices and fix common issues.
        </p>

        <div className="mt-6 space-y-4">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold underline">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
