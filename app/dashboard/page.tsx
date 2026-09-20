import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const noteCount = await prisma.note.count();

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500">Nombre total de notes :</p>
        <p className="text-3xl font-bold mt-2">{noteCount}</p>
      </div>
    </main>
  );
}
