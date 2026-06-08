"use client";

import { useBlogs } from "@/hooks/useBlogs";

export default function BlogsPage() {
  const { blogs, loading } = useBlogs();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog: any) => (
          <div key={blog.id} className="border p-4 rounded-lg shadow">
            <h2 className="font-bold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}