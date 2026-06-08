import { NextResponse } from "next/server";

let products: any[] = [
  {
    id: 1,
    title: "Laptop",
    price: 500,
    image: "https://via.placeholder.com/300x200?text=Laptop",
  },
];

// GET
export async function GET() {
  return NextResponse.json({
    success: true,
    data: products,
  });
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = {
    id: Date.now(),
    ...body,
  };

  products.push(newProduct);

  return NextResponse.json({
    success: true,
    message: "Product created",
    data: newProduct,
  });
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();

  products = products.map((p) =>
    p.id === body.id ? { ...p, ...body } : p
  );

  return NextResponse.json({
    success: true,
    message: "Product updated",
  });
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  products = products.filter((p) => p.id !== id);

  return NextResponse.json({
    success: true,
    message: "Product deleted",
  });
}