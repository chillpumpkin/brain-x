import React, { useEffect, useState, useRef } from "react";
import { Textarea } from "@nextui-org/react"; // Adjust the import based on your setup
import { BookText, MessageSquareQuote } from "lucide-react";

interface DocTextAreaProps {
  src?: string; // URL to fetch content from
  text?: string;
  color?: string;
  isHuman?: boolean;
}

const DocTextArea: React.FC<DocTextAreaProps> = ({
  src,
  text,
  color,
  isHuman
}) => {
  const [textContent, setTextContent] = useState<string>(text || "");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch content if src is provided
  useEffect(() => {
    if (src) {
      const fetchContent = async () => {
        try {
          const response = await fetch(src);
          const fetchedText = await response.text();
          setTextContent(fetchedText);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };
      fetchContent();
    }
  }, [src]);

  // Auto-adjust the height of the Textarea whenever the text content changes
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height to auto
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set the height to the scrollHeight to fit the content
    }
  }, [textContent]); // Re-run this effect whenever text content changes

  return (
    <Textarea
      ref={textAreaRef} // Use ref to get the textarea element
      readOnly
      variant= {isHuman ? "flat" : "underlined"}
      placeholder="Hey, I'm ready to answer all your questions!"
      size="lg"
      className="resize-none"
      style={{
        textAlign: isHuman ? "right" : "left",
        overflow: "hidden",
        height: "auto",
        backgroundColor: "bg-gray-100",
      }}
      fullWidth
      minRows={1}
      value={textContent}
      startContent={
        src == null 
        ? (!isHuman && <MessageSquareQuote />)
        : <BookText />
      }
    />
  );
};

export default DocTextArea;
