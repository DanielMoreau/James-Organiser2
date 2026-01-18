"use client";

import { useEffect, useState, FormEvent } from "react";

type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      return;
    }

    setEmail("");
    setName("");
    await loadUsers();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    await loadUsers();
  }

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-gray-500">
          Liste des utilisateurs stockés dans SQLite via Prisma.
        </p>
      </header>

      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold">Créer un user</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm">Email</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm">Nom</label>
            <input
              className="w-full border rounded px-2 py-1 text-sm"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="px-3 py-1 rounded bg-black text-white text-sm"
          >
            Créer
          </button>
        </form>
      </section>

      <section className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold">Liste</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Chargement…</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun user pour l’instant.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between border rounded px-3 py-2 text-sm"
              >
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-gray-500">{u.email}</div>
                </div>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-xs px-2 py-1 rounded border border-red-500 text-red-500"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
