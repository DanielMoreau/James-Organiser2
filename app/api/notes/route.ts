import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

// GET /api/notes
export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(notes);
}

// POST /api/notes
export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.content || typeof body.content !== "string") {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const note = await prisma.note.create({
    data: {
      content: body.content,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
