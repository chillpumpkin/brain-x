"use client";

import { Authenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import UploadDocumentButton from "./upload-document-button";
import { Spinner } from "@nextui-org/spinner";
import ElegantDocumentCard from "./document-card";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

    // Handle loading state
    if (documents === undefined) {
      return (
        <main className="w-full space-y-20">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Notes</h1>
            {/* Optionally, show CreateNoteButton here */}
          </div>
          <div className="flex justify-center items-center h-64">
            <Spinner color="primary" size="lg" />
          </div>
        </main>
      );
    }

  return (
    <main className="space-y-6 w-full">
      <div className="flex justify-between items-center gap-20">
        <Authenticated>
          <h1 className="text-4xl font-bold bg-clip-text">My documents</h1>
          {documents !== undefined && documents?.length !== 0 && (
            <UploadDocumentButton />
          )}
        </Authenticated>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {documents?.map((doc) => <ElegantDocumentCard documentId={doc._id} />)}
      </div>

      {documents?.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-8">
          <Image src="/document.svg" alt="empty" width={200} height={200} />
          <p className="text-center text-lg mt-4">
            You don't have any documents yet. Click the button above to below a
            document.{" "}
          </p>
          <UploadDocumentButton />
        </div>
      )}
    </main>
  );
}
