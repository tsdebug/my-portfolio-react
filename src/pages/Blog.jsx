import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postContent, setPostContent] = useState('');

  // Fetch list of blog posts
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/your-username/blog-repo/main/posts.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Failed to fetch posts:", error));
  }, []);

  // Fetch content of selected post
  useEffect(() => {
    if (!selectedPost) return;
    fetch(`https://raw.githubusercontent.com/your-username/blog-repo/main/posts/${selectedPost.id}.md`)
      .then((res) => res.text())
      .then((text) => setPostContent(text))
      .catch((error) => console.error("Failed to fetch post content:", error));
  }, [selectedPost]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      {!selectedPost ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="mb-4">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setSelectedPost(post)}
              >
                {post.title}
              </button>
              <div className="text-gray-500 text-sm">{post.date}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="text-gray-500 hover:underline mb-4"
            onClick={() => setSelectedPost(null)}
          >
            ← Back to posts
          </button>
          <ReactMarkdown className="prose prose-blue">{postContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Blog;
