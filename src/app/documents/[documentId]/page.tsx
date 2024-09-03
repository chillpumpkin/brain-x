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
            <div className="flex gap-10">
              <div className="p-4 rounded bg-slate-800 flex-1">
                {document.documentUrl != null && 
                <iframe className="w-full" src={document.documentUrl}/>}
              </div>
              <div className="w-[300px] bg-slate-800"></div>
            </div>
        </main>
    );
}