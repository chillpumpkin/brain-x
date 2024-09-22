"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const router = useRouter();

  return (
    <>
      <Button
        startContent={<Trash2 className="h-4 w-4" />}
        color="danger"
        variant="bordered"
        onPress={onOpen}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you absolutely sure?
              </ModalHeader>
              <ModalBody>
                <p>
                  This action cannot be undone. This will permanently delete the
                  document.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() =>
                    deleteDocument({
                      documentId: documentId,
                    }).then(() => router.push("/"))
                  }
                  color="primary"
                  onPress={onClose}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
