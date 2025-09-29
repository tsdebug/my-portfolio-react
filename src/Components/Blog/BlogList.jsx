// src/Components/Blog/BlogList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { docs } from '../../../source.generated';

const fmt = (iso) =>
  iso ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso)) : '';

export default function BlogList() {
  // 1) Try to use precompiled metadata from Fumadocs
  const staticItems = useMemo(() => {
    if (!docs?.meta) return [];
    const items = Object.entries(docs.meta).map(([path, meta]) => {
      const slug = path.split('/').pop();
      return {
        path,
        slug,
        title: meta.title ?? 'Untitled',
        description: meta.description ?? '',
        date: meta.date ?? '',
        author: meta.author ?? '',
      };
    });
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    return items;
  }, []);

  // 2) Fallback: dynamically import each MDX to extract frontmatter
  const [dynamicItems, setDynamicItems] = useState(null);

  useEffect(() => {
    if (staticItems.length > 0) return; // already have meta
    const entries = Object.entries(docs.doc || {});
    if (entries.length === 0) {
      setDynamicItems([]); // nothing to show
      return;
    }

    (async () => {
      const all = await Promise.all(
        entries.map(async ([path, importer]) => {
          const mod = await importer(); // load MDX module
          const fm = mod.frontmatter || {};
          const slug = path.split('/').pop();
          return {
            path,
            slug,
            title: fm.title || slug,
            description: fm.description || '',
            date: fm.date || '',
            author: fm.author || '',
          };
        })
      );
      all.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDynamicItems(all);
    })();
  }, [staticItems.length]);

  const items = staticItems.length > 0 ? staticItems : dynamicItems ?? [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>

      {dynamicItems === null && staticItems.length === 0 ? (
        <p className="text-neutral-300">Loading posts…</p>
      ) : items.length === 0 ? (
        <p className="text-neutral-300">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {items.map((post) => (
            <li key={post.path} className="rounded-xl bg-white/5 p-5 hover:bg-white/10 transition">
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