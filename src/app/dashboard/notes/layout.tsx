"use client";

import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { Spinner } from "@nextui-org/spinner";
import { useUser, useClerk } from "@clerk/nextjs";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to sign-in page with the current path as redirectUrl
      redirectToSignIn({ redirectUrl: window.location.href });
    }
  }, [user, redirectToSignIn, router]);

  const notes = useQuery(api.notes.getNotes);
  const params = useParams();
  const noteId = params?.noteId;

  // Handle loading state
  if (notes === undefined) {
    return (
      <main className="w-full space-y-20">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Notes</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </main>
    );
  }

  // Check if there are notes
  const hasNotes = notes.length !== 0;

  return (
    <main className="w-full space-y-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>
      <div className="flex flex-col md:flex-row ">
        <ul className="space-y-2 w-full md:w-[300px]">
          {notes.map((note) => (
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
          <div className="bg-gray-900 rounded-xl p-4 w-full h-auto border overflow-auto">
            {children}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <Image src="/notes.svg" alt="empty" width={200} height={200} />
            <p className="text-center text-lg mt-4">
              You don't have any notes yet. Click the button below to create a
              note.
            </p>
            <CreateNoteButton />
          </div>
        )}
      </div>
    </main>
  );
}
