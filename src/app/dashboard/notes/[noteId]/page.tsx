'use client';

import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function NotePage() {
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    const note = useQuery(api.notes.getNote, {
      noteId: noteId,
    });
    return <div>{note?.text}</div>;
  }