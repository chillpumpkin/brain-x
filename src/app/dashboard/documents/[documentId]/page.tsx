"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import ChatPanel from "@/components/chat-panel";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab, Skeleton, Button } from "@nextui-org/react";
import DocTextArea from "@/components/doc-text-area";
import DeleteButton from "@/components/delete-button";

export default function DocumentPage({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) {
  var document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  return (
    <main className="p-24 h-screen">
      {!document && (
        <div className="space-y-5 p-2">
          <div className="space-y-5">
            <Skeleton className="w-[450px] h-[50px] rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-[150px] h-[25px] rounded-xl" />
            <Skeleton className="w-[150px] h-[25px] rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-[500px] w-[1300px] rounded-xl" />
          </div>
        </div>
      )}
      {document && (
        <>
          <div className="flex justify-between items-center gap-20 py-4">
            <h1 className="text-4xl font-bold">{document.title}</h1>
            <DeleteButton documentId={params.documentId} />
          </div>
          <Tabs aria-label="Options">
            <Tab key="documents" title="Documents">
              <Card className="h-[65vh]">
                <CardBody>
                  <div className="rounded-xl w-full">
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
                  <div
                    className="flex gap-1 mt-auto p-3"
                    style={{
                      position: "sticky",
                      bottom: "0px", // Sticks to the bottom of the container
                      zIndex: 100, // Keeps it above other content
                    }}
                  >
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </>
      )}
    </main>
  );
}
