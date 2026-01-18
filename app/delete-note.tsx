"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteNote({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      router.refresh();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        marginTop: 8,
        background: "transparent",
        border: "none",
        color: loading ? "#aaa" : "red",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Suppression..." : "🗑️ Supprimer"}
    </button>
  );
}
