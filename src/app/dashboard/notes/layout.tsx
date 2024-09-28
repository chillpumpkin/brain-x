"use client";
import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const notes = useQuery(api.notes.getNotes);
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const { theme } = useTheme();

  const hasNotes = notes && notes.length !== 0;

  return (
    <main className="w-full space-y-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        {hasNotes && <CreateNoteButton />}
      </div>
      <div className="flex gap-12">
        <ul className="space-y-2 w-[300px]">
          {notes?.map((note) => (
            <li
              key={note._id}
              className={cn("text-base hover:text-purple-500", {
                "text-purple-500": note._id === noteId,
              })}
            >
              <Link href={`/dashboard/notes/${note._id}`}>
                {note.text.substring(0, 24) + "..."}
              </Link>
            </li>
          ))}
        </ul>
        {hasNotes ? (
          <div
            className={cn(
              "bg-gray-900 rounded-xl p-4 w-full h-[400px] border",
              {
                "bg-white": theme === "light",
              }
            )}
          >
            {children}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-8">
            <Image src="/notes.svg" alt="empty" width={200} height={200}/>
            <p className="text-center text-lg mt-4">
              You don't have any notes yet. Click the button above to create a
              note.{" "}
            </p>
            <CreateNoteButton />
          </div>
        )}
      </div>
    </main>
  );
}
