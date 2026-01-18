"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus automatique au chargement
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const value = content.trim();

    if (value.length < 3) {
      setError("La note doit contenir au moins 3 caractères.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value }),
      });

      if (!res.ok) {
        throw new Error("POST failed");
      }

      setContent("");
      router.refresh();
      textareaRef.current?.focus();
    } catch {
      setError("Impossible de créer la note. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Créer</h2>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Écris ta note ici…"
        disabled={loading}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 12,
          border: "1px solid #ddd",
          resize: "vertical",
          outline: "none",
          opacity: loading ? 0.6 : 1,
        }}
      />

      {error && (
        <p style={{ color: "crimson", marginTop: 6, fontSize: 13 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 10,
          width: "100%",
          padding: 12,
          borderRadius: 14,
          border: "none",
          background: "#3b6ef6",
          color: "white",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Création…" : "Créer"}
      </button>
    </form>
  );
}
