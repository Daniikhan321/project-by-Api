import { NextResponse } from "next/server";

let contacts: any[] = [
  { id: 1, name: "Daniyal", email: "test@gmail.com", phone: "12345" },
];

// GET
export async function GET() {
  return NextResponse.json({
    success: true,
    data: contacts,
  });
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const newContact = {
    id: Date.now(),
    ...body,
  };

  contacts.push(newContact);

  return NextResponse.json({
    success: true,
    message: "Contact created",
    data: newContact,
  });
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();

  contacts = contacts.map((c) =>
    c.id === body.id ? { ...c, ...body } : c
  );

  return NextResponse.json({
    success: true,
    message: "Contact updated",
  });
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  contacts = contacts.filter((c) => c.id !== id);

  return NextResponse.json({
    success: true,
    message: "Contact deleted",
  });
}