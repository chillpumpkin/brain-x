"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Authenticated } from "convex/react";
import { CirclePlus } from "lucide-react";
import CreateNoteForm from "./create-note-form";
import { useToast } from "@/hooks/use-toast";

export default function CreateNoteButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { toast } = useToast();

  return (
    <>
      <Authenticated>
        <Button
          onPress={onOpen}
          className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg rounded-lg"
          color="success"
        >
          <CirclePlus /> Create note
        </Button>
      </Authenticated>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-[50vh]"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 flex-row">
                Create your note
              </ModalHeader>
              <ModalBody>
                <CreateNoteForm
                  onNoteCreated={() => {
                    onClose();
                    toast({
                      title: "Note created",
                      description: "Your note has been created successfully",
                    });
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
