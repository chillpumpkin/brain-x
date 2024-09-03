'use client'

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function DocumentPage({
    params,
  }: {
    params: {
      documentId: Id<"documents">;
    };
  }) {

    const document = useQuery(api.documents.getDocument, {
        documentId: params.documentId,
      });

    if (!document) {
        return <div>
            You don't have access to view this document.
        </div>
    }

    return (
        <main className="p-24">
            <div className="flex justify-between items-center gap-20 py-6">
                <h1 className="text-4xl font-bold">{document.title}</h1>
            </div>
            <div className="flex">
              <div className="bg-gray-900">
                {document.documentUrl != null && 
                  <iframe src={document.documentUrl}></iframe>
                } 
              </div>
            </div>
        </main>
    );
}