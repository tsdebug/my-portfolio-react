// src/Components/Blog/BlogList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { docs } from '../../../source.generated';

const fmt = (iso) =>
  iso ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso)) : '';

const toNiceTitle = (slug = '') =>
  slug
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // drop leading date
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function BlogList() {
  const [items, setItems] = React.useState(null); // null = loading

  React.useEffect(() => {
    const entries = Object.entries(docs.doc || {});
    if (entries.length === 0) {
      setItems([]); // plugin didn't see files (or none exist)
      return;
    }

    (async () => {
      const loaded = await Promise.all(
        entries.map(async ([key, importer]) => {
          // filename part
          const file = (key.split('/').pop() || '');
          const slug = file.replace(/\.mdx?$/i, ''); // clean slug (no .md/.mdx)

          // Prefer generated meta; otherwise import module to get frontmatter
          let fm = docs.meta?.[key];
          if (!fm) {
            try {
              const mod = await importer();
              fm = mod.frontmatter || {};
            } catch (e) {
              console.error('Failed to import MDX for list:', key, e);
              fm = {};
            }
          }

          return {
            key,
            slug,
            title: fm.title || toNiceTitle(slug),
            description: fm.description || '',
            date: fm.date || '',
            author: fm.author || '',
          };
        })
      );

      loaded.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      setItems(loaded);
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>

      {items === null ? (
        <p className="text-neutral-300">Loading posts…</p>
      ) : items.length === 0 ? (
        <p className="text-neutral-300">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {items.map((post) => (
            <li key={post.key} className="rounded-xl bg-white/5 p-5 hover:bg-white/10 transition">
              <Link to={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl md:text-2xl font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-neutral-400 mt-1">
                {post.date ? fmt(post.date) : null}
              </p>
              {post.description && (
                <p className="text-neutral-200 mt-2">{post.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}