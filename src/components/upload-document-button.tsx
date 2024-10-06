import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Authenticated } from "convex/react";
import UploadDocumentForm from "./upload-document-form";
import { Upload } from "lucide-react";

export default function UploadDocumentButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Authenticated>
        <Button
          onPress={onOpen}
          className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg rounded-lg"
          color="success"
        >
          <Upload className="w-4 h-4" /> Upload document
        </Button>
      </Authenticated>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload your document
              </ModalHeader>
              <ModalBody>
                <p className="text-opacity-60">
                  Upload a team document for you to search in the future.
                </p>
              </ModalBody>
              <ModalFooter className="flex">
                <div className="mr-auto">
                  <UploadDocumentForm onUpload={onClose} />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
