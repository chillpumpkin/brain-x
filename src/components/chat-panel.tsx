import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useTheme } from "next-themes";
import DocTextArea from "./doc-text-area";
import QuestionForm from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const { theme } = useTheme();
  const chats = useQuery(api.chats.getChatRecords, { documentId });

  return (
    <div
      className={`h-[62vh] rounded-xl flex flex-col ${
        theme === "dark" ? "bg-neutral-850" : "bg-white"
      }`}
    >
      <div className="flex flex-col gap-2 overflow-y-auto ">
      {chats?.map(chat => (
            <DocTextArea isHuman={chat.isHuman} text={chat.text}/>
      ))}
      </div>

      <div className="flex gap-1 mt-auto p-3">
        <QuestionForm documentId={documentId}/>
      </div>
    </div>
  );
}
