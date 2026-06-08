import { NextResponse } from "next/server";

let blogs: any[] = [
  { id: 1, title: "First Blog", body: "Hello world" },
];

// GET - all blogs
export async function GET() {
  return NextResponse.json({
    success: true,
    data: blogs,
  });
}

// POST - create blog
export async function POST(req: Request) {
  const body = await req.json();

  const newBlog = {
    id: Date.now(),
    ...body,
  };

  blogs.push(newBlog);

  return NextResponse.json({
    success: true,
    message: "Blog created",
    data: newBlog,
  });
}

// PUT - update blog
export async function PUT(req: Request) {
  const body = await req.json();

  blogs = blogs.map((blog) =>
    blog.id === body.id ? { ...blog, ...body } : blog
  );

  return NextResponse.json({
    success: true,
    message: "Blog updated",
  });
}

// DELETE - remove blog
export async function DELETE(req: Request) {
  const { id } = await req.json();

  blogs = blogs.filter((b) => b.id !== id);

  return NextResponse.json({
    success: true,
    message: "Blog deleted",
  });
}