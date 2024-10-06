import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
  const deleteNote = useMutation(api.notes.deleteNote);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="absolute -top-3 -right-3"
        color="danger"
        variant="bordered"
        onPress={onOpen}
        size="sm"
      >
        <Trash />
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
                  note.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() =>
                    deleteNote({
                      noteId: noteId,
                    }).then(() => router.push("/dashboard/notes"))
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
