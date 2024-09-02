'use client'

import { Authenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DocumentCard from "@/components/document-card";
import UploadDocumentButton from "@/components/upload-document-button";

export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-24">
      <div className="flex justify-between items-center gap-20 py-6">
        <Authenticated>
        <h1 className="text-4xl font-bold">My documents</h1>
        <UploadDocumentButton />
        </Authenticated>
      </div>
      <div className="grid grid-cols-6 gap-8">
        {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
      </div>
    </main>
  );
}
