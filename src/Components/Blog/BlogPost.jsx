import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, task lists)
import matter from 'gray-matter'; // For extracting front matter

const BlogPost = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [postContent, setPostContent] = useState('');
  const [postData, setPostData] = useState({}); // To store front matter data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`); // Fetch the specific MD file
        if (!response.ok) {
          throw new Error(`Blog post "${slug}" not found.`);
        }
        const markdown = await response.text();
        const { data, content } = matter(markdown); // Use gray-matter to separate front matter and content

        setPostData({
          ...data,
          date: new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });
        setPostContent(content);
      } catch (err) {
        console.error(`Error fetching post ${slug}:`, err);
        setError(err.message || "Failed to load blog post. It might not exist or there was a network error.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // Re-fetch if the slug changes

  if (loading) return <div className="text-center py-20 text-xl text-gray-400">Loading post...</div>;
  if (error) return (
    <div className="text-center py-20 text-xl text-red-500">
      <p>{error}</p>
      <Link to="/blog" className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
        &larr; Back to all posts
      </Link>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-[#171d32] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/blog"
          className="inline-block mb-8 text-indigo-400 hover:text-indigo-300 transition-colors
                     text-lg font-medium"
        >
          &larr; Back to all posts
        </Link>

        {postData.image && (
          <img
            src={postData.image}
            alt={postData.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-10"
            loading="lazy"
          />
        )}

        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">{postData.title}</h1>
        <p className="text-gray-400 text-xl mb-8">
          Published on {postData.date} by {postData.author || 'Anonymous'}
          {postData.tags && postData.tags.length > 0 && (
            <span className="ml-4"> | Tags: {postData.tags.join(', ')}</span>
          )}
        </p>

        {/* The magic of Tailwind Typography: 'prose' class */}
        <div className="prose prose-invert prose-lg max-w-none
                      prose-h1:text-white prose-h2:text-white prose-h3:text-white
                      prose-a:text-indigo-400 hover:prose-a:text-indigo-300
                      prose-strong:text-white
                      prose-code:text-indigo-300 prose-code:bg-gray-800
                      prose-blockquote:border-indigo-500 prose-blockquote:text-gray-300
                      prose-ul:text-gray-200 prose-ol:text-gray-200
                      ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={postContent}
            // Custom components to apply Tailwind styles directly if 'prose' isn't enough
            components={{
              img: ({ node, ...props }) => <img className="rounded-lg shadow-md my-6 w-full max-h-[500px] object-cover" {...props} />,
              a: ({ node, ...props }) => <a className="text-indigo-400 hover:text-indigo-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
              code: ({ inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm my-4">
                    <code className={`language-${match[1]}`} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-indigo-300" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogPost;