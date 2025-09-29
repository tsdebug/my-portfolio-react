// src/Components/Blog/BlogPost.jsx
import React, { Suspense, useEffect, useMemo, useState } from 'react';
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
          Failed to render this post. Open the console for details.
        </p>
      );
    }
    return this.props.children;
  }
}

const renderer = toClientRenderer(docs.doc, ({ default: Mdx }) => (
  <div className="prose prose-invert max-w-none mt-8">
    <Mdx />
  </div>
));

export default function BlogPost() {
  const { slug } = useParams();

  // Match key by comparing filename without extension
  const docKey = React.useMemo(() => {
  const keys = Object.keys(docs.doc || {});
  return keys.find(
    (k) => (k.split('/').pop() || '').replace(/\.mdx?$/i, '') === slug
  ) ?? null;
}, [slug]);
  const [fm, setFm] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!docKey) {
      setStatus('notfound');
      return;
    }
    setStatus('loading');

    const meta = docs.meta?.[docKey];
    if (meta) setFm(meta);

    docs.doc[docKey]()
      .then((mod) => {
        if (!meta) setFm(mod.frontmatter || {});
        setStatus('ready');
      })
      .catch((err) => {
        console.error('MDX import failed:', err);
        setStatus('error');
      });
  }, [docKey]);

  if (!docKey) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <p className="mb-6">
          <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
        </p>
        <h1 className="text-2xl font-bold">Post not found</h1>
      </main>
    );
  }

  const Content = renderer[docKey];

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <p className="mb-6">
        <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">{fm?.title ?? slug}</h1>
      <p className="text-sm text-neutral-400 mt-2">
        {fm?.date ? fmt(fm.date) : null}
        {fm?.author ? ` • ${fm.author}` : ''}
      </p>

      {status === 'loading' && <p className="text-neutral-300 mt-8">Loading…</p>}
      {status === 'error' && (
        <p className="text-red-400 mt-8">
          Couldn’t load this post. Check image paths.
        </p>
      )}

      {status === 'ready' && (
        <ErrorBoundary>
          <Suspense fallback={<p className="text-neutral-300 mt-8">Loading…</p>}>
            <Content />
          </Suspense>
        </ErrorBoundary>
      )}
    </article>
  );
}