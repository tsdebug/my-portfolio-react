import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../postsData";


const BlogList = () => (
  <div className="max-w-3xl mx-auto px-4">
    <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
    <ul>
      {posts.map(({ slug, title, date }) => (
        <li key={slug} className="mb-4">
          <Link to={`/blog/${slug}`} className="text-blue-600 hover:underline">
            {title}
          </Link>{" "}
          <span className="text-gray-500">({date})</span>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogList;
