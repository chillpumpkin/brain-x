"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatPanel from "@/components/chat-panel";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/react";
import DocTextArea from "@/components/doc-text-area";

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
    return <div>You don't have access to view this document.</div>;
  }

  return (
    <main className="px-6 h-screen">
      <div className="flex justify-between items-center gap-20 py-4">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>
      <Tabs aria-label="Options">
        <Tab key="documents" title="Documents">
          <Card className="h-[65vh]">
            <CardBody>
              <div className="rounded-xl w-full">
                {/* {document.documentUrl != null && 
                      <iframe className="bg-gray-600 w-full h-full rounded-xl border-none" src={document.documentUrl}/>} */}
                {document.documentUrl != null && (
                  <DocTextArea src={document.documentUrl} isHuman={false} />
                )}
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="chat" title="Chat">
          <Card className="h-[60vhe]">
            <CardBody>
              <ChatPanel documentId={document._id} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </main>
  );
}
