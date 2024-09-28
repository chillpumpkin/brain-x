"use client";

import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import DeleteNoteButton from "./delete-note-button";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, {
    noteId: noteId,
  });
  const notes = useQuery(api.notes.getNotes);

  const deleteNote = useMutation(api.notes.deleteNote);

  return (
    <div className="relative">
      {notes && notes?.length !== 0 && <DeleteNoteButton noteId={noteId} />}
      {note?.text}
    </div>
  );
}
