import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
