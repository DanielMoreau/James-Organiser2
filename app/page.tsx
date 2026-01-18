export const dynamic = "force-dynamic";

import { prisma } from "../lib/prisma";
import CreateNote from "./create-note";
import DeleteNote from "./delete-note";

export default async function Home() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="glass-card">
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Notes</h1>
        <p style={{ opacity: 0.6, fontSize: 12 }}>
          {notes.length} note{notes.length > 1 ? "s" : ""}
        </p>
      </header>

      {notes.length === 0 && (
        <p style={{ opacity: 0.6 }}>Aucune note pour le moment.</p>
      )}

      <ul
        style={{
          display: "grid",
          gap: 12,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {notes.map((note) => (
          <li key={note.id} className="note-card">
            <p style={{ margin: 0, fontWeight: 600 }}>
              {note.content}
            </p>

            <small style={{ opacity: 0.6 }}>
              {new Date(note.createdAt).toLocaleString()}
            </small>

            <DeleteNote id={note.id} />
          </li>
        ))}
      </ul>

      <hr style={{ margin: "20px 0", opacity: 0.2 }} />

      <CreateNote />
    </main>
  );
}
