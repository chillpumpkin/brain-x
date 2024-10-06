import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";
import { File } from "lucide-react";

type TextBlockProps = {
  text: string;
  type: "note" | "document";
};

export default function TextBlock({ text, type }: TextBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative p-1 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 w-full"
        animate={{
          boxShadow: isHovered
            ? "0 0 25px rgb(168 85 247 / 0.5)"
            : "0 0 5px rgb(168 85 247 / 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="relative overflow-hidden rounded-lg bg-gray-900 p-8 text-center w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {type === "note" ? <NotebookPen /> : <File />}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
            }}
          />
          <motion.h2
            className="relative text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          ></motion.h2>
          <motion.p
            className="relative text-lg text-gray-300"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {text}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
