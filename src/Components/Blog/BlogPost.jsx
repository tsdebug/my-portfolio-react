// src/Components/Blog/BlogPost.jsx
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { docs } from '../../../source.generated';

const fmt = (iso) =>
  iso ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso)) : '';

// Build renderer from compiled MDX registry
const renderer = toClientRenderer(docs.doc, ({ default: Mdx }) => {
  return function Rendered() {
    return (
      <div className="prose prose-invert max-w-none mt-8">
        <Mdx />
      </div>
    );
  };
});

export default function BlogPost() {
  const { slug } = useParams();

  // Find the internal path that matches this slug (last segment)
  const path = useMemo(() => {
    for (const p of Object.keys(docs.doc || {})) {
      if (p.split('/').pop() === slug) return p;
    }
    return null;
  }, [slug]);

  const [frontmatter, setFrontmatter] = useState(null);

  useEffect(() => {
    if (!path) return;
    const meta = docs.meta?.[path];
    if (meta) {
      setFrontmatter(meta);
      return;
    }
    // Fallback: load module to read frontmatter
    (async () => {
      const mod = await docs.doc[path]();
      setFrontmatter(mod.frontmatter || {});
    })();
  }, [path]);

  if (!path) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <p className="mb-6">
          <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
        </p>
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const Content = renderer[path];

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <p className="mb-6">
        <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">{frontmatter?.title ?? 'Untitled'}</h1>
      <p className="text-sm text-neutral-400 mt-2">
        {frontmatter?.date ? fmt(frontmatter.date) : null}
        {frontmatter?.author ? ` • ${frontmatter.author}` : ''}
      </p>

      <Suspense fallback={<p className="text-neutral-300 mt-8">Loading…</p>}>
        <Content />
      </Suspense>
    </article>
  );
}