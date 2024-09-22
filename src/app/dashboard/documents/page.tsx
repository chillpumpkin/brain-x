"use client";

import { Authenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import DocumentCard from "./document-card";
import UploadDocumentButton from "./upload-document-button";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

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
      <div className="grid grid-cols-4 gap-8">
        {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
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
