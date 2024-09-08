import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react"; // Adjust the import based on your setup
import { BookText, MessageSquareQuote } from "lucide-react";

interface DocTextAreaPropsProps {
  src?: string; // URL to fetch content from
  text?: string;
  color?: string;
  isHuman?: boolean;
}

const DocTextArea: React.FC<DocTextAreaPropsProps> = ({
  src,
  text,
  color,
  isHuman
}) => {
  const [textContent, setTextContent] = useState<string>("");

  useEffect(() => {
    if (src == null) {
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(src);
        const text = await response.text();
        setTextContent(text);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [src]);

  return (
    <Textarea
      isReadOnly
      variant="bordered"
      placeholder="Hey, I'm ready to answer all your questions!"
      size="lg"
      
      style={{ textAlign: isHuman ? "right" : "left" }}
      fullWidth
      maxRows={src == null ? 1 : 19}
      radius="full"
      value={`${src == null ? text : textContent}`}
      startContent={
        src == null 
        ? 
        !isHuman && <MessageSquareQuote />
         : 
         <BookText />}
    />
  );
};

export default DocTextArea;
