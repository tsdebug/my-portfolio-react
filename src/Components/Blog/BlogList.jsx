import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter'; 

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // --- How to get slugs ---
        // For a small number of posts, you can manually list them:
        const postSlugs = ['setup-jekyell-blog', 'internship-journey', 'full-stack-development', 'document-object-model']; // Make sure these match .md filenames

        // For a more dynamic approach in development with Vite:
        // const markdownFiles = import.meta.glob('../../public/posts/*.md', { as: 'raw', eager: true });
        // const fetchedPosts = await Promise.all(
        //   Object.entries(markdownFiles).map(async ([path, markdownContent]) => {
        //     const { data } = matter(markdownContent);
        //     const slug = path.split('/').pop().replace('.md', ''); // Extract slug from filename
        //     return { ...data, slug: slug };
        //   })
        // );

        // For production, you'll want a build script to generate a JSON manifest
        // or a more robust way to list slugs. For this example, we'll simulate
        // fetching with manual slugs and then enhance with actual content fetching.

        const fetchedPosts = await Promise.all(
          postSlugs.map(async (slug) => {
            const response = await fetch(`/posts/${slug}.md`);
            if (!response.ok) {
              console.warn(`Could not fetch post: /posts/${slug}.md`);
              return null; // Skip if file not found
            }
            const markdown = await response.text();
            const { data } = matter(markdown); // Extract front matter
            return {
              ...data,
              slug: slug,
              date: new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            };
          })
        );
        // Filter out any null posts if a file wasn't found
        setPosts(fetchedPosts.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center py-10 text-xl text-gray-400">Loading blog posts...</div>;
  if (error) return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  if (posts.length === 0) return <div className="text-center py-10 text-xl text-gray-400">No blog posts found.</div>;

  return (
    <section id="blog" className="py-16 md:py-24 bg-[#171d32]"> {/* Ensure consistent background */}
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-white mb-12">My Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-[#2a3044] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
                         transform hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  loading="lazy"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-white mb-3">
                  <Link to={`/blog/${post.slug}`} className="hover:text-indigo-400 transition-colors duration-200">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Published on {post.date} by {post.author || 'Anonymous'}
                </p>
                <p className="text-gray-300 text-lg mb-6 flex-grow">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-block self-start mt-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg
                             hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                >
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;