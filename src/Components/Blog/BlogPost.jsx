// src/Components/Blog/BlogPost.jsx
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { docs } from '../../../source.generated';

const fmt = (iso) =>
  iso ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso)) : '';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <p className="text-red-400 mt-6">
          Failed to render this post. Open the console for details (likely an image path issue).
        </p>
      );
    }
    return this.props.children;
  }
}

// Build lazy components for each MDX module
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

  // Find the compiled key for this slug (we assume flat files in src/posts)
  const docKey = useMemo(() => {
    const keys = Object.keys(docs.doc || {});
    return keys.find((k) => k.split('/').pop() === slug) ?? null;
  }, [slug]);

  const [frontmatter, setFrontmatter] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!docKey) {
      setStatus('notfound');
      return;
    }
    setStatus('loading');

    // Prefer meta (already compiled)
    const meta = docs.meta?.[docKey];
    if (meta) setFrontmatter(meta);

    // Preload actual content module; if it errors (e.g., bad image path), we’ll see it
    docs.doc[docKey]()
      .then((mod) => {
        if (!meta) setFrontmatter(mod.frontmatter || {});
        setStatus('ready');
      })
      .catch((err) => {
        console.error('MDX import failed:', err);
        setStatus('error');
      });
  }, [docKey]);

  if (status === 'notfound') {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <p className="mb-6">
          <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
        </p>
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const Content = docKey ? renderer[docKey] : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <p className="mb-6">
        <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">{frontmatter?.title ?? slug}</h1>
      <p className="text-sm text-neutral-400 mt-2">
        {frontmatter?.date ? fmt(frontmatter.date) : null}
        {frontmatter?.author ? ` • ${frontmatter.author}` : ''}
      </p>

      {status === 'loading' && <p className="text-neutral-300 mt-8">Loading…</p>}
      {status === 'error' && (
        <p className="text-red-400 mt-8">
          Couldn’t load this post. Check image paths:
          - public assets: /blog-assets/...
          - src assets: relative to the MDX file (e.g., ../blog-assets/image.png)
        </p>
      )}

      {Content && status === 'ready' && (
        <ErrorBoundary>
          <Suspense fallback={<p className="text-neutral-300 mt-8">Loading…</p>}>
            <Content />
          </Suspense>
        </ErrorBoundary>
      )}
    </article>
  );
}