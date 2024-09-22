"use client";

import { Authenticated, useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { Textarea } from "@nextui-org/react";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);

  return (
    <div>Please select a note</div>
  );
}
