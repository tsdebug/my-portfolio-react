import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

const Post = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/posts/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then((text) => setContent(text))
      .catch(() => setContent("Error loading post."));
  }, [slug]);

  return (
    <article className="prose max-w-3xl mx-auto px-4 py-8">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default Post;
