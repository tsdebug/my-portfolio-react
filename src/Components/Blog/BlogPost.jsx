// src/Components/Blog/BlogPost.jsx
import React, { Suspense, useMemo } from 'react';
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

// IMPORTANT: return JSX here, not a function component
const renderer = toClientRenderer(docs.doc, ({ default: Mdx }) => (
  <div className="prose prose-invert max-w-none mt-8">
    <Mdx />
  </div>
));

export default function BlogPost() {
  const { slug } = useParams();

  // Match the MDX key by slug (filename without extension)
  const docKey = useMemo(() => {
    const keys = Object.keys(docs.doc || {});
    return keys.find((k) => k.split('/').pop() === slug) ?? null;
  }, [slug]);

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

  const meta = docs.meta?.[docKey];
  const Content = renderer[docKey];

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <p className="mb-6">
        <Link to="/blog" className="text-blue-400 hover:underline">← Back to blog</Link>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold">{meta?.title ?? slug}</h1>
      <p className="text-sm text-neutral-400 mt-2">
        {meta?.date ? fmt(meta.date) : null}
        {meta?.author ? ` • ${meta.author}` : ''}
      </p>

      <ErrorBoundary>
        <Suspense fallback={<p className="text-neutral-300 mt-8">Loading…</p>}>
          <Content />
        </Suspense>
      </ErrorBoundary>
    </article>
  );
}