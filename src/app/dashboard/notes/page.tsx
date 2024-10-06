"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);

  return <div className="text-2xl">Please select a note</div>;
}
