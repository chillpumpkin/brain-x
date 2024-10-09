"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function DocumentCard({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  var document = useQuery(api.documents.getDocument, {
    documentId: documentId,
  });

  const content = document?.documentUrl;

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg"
        onClick={() => {
          router.push(`/documents/${documentId}`);
        }}
      >
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {document?.title}
          </CardTitle>
          <div className="flex items-center mt-2 space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-700 text-gray-200">
                {(user?.firstName?.substring(0, 1) ?? "") +
                  " " +
                  (user?.lastName?.substring(0, 1) ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-300">
              {(user?.firstName ?? "") + " " + (user?.lastName ?? "")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 p-4">
            <p className="text-sm leading-relaxed">{content}</p>
          </ScrollArea>
        </CardContent>
        <div className="px-4 py-2 bg-gray-800 bg-opacity-50">
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>
    </motion.div>
  );
}
