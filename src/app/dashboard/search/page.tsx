"use client";

import { useEffect, useState } from "react";
import SearchForm from "./search-form";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import TextBlock from "./text-box";
import { NotebookPen, Search } from "lucide-react";
import { File } from "lucide-react";

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);

  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (results) {
      setVisibleIndexes([]); // Reset visibility
      results.forEach((_, index) => {
        setTimeout(() => {
          setVisibleIndexes((prev) => [...prev, index]);
        }, index * 200); // Adjust the delay (e.g., 100ms) between each item
      });
    }
  }, [results]);

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>
      <SearchForm
        setResults={(searchResults) => {
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />
      <div className="flex flex-col gap-3">
        {results?.map((result, index) => {
          const isVisible = visibleIndexes.includes(index);
          return (
            <Link
              className={`gap-2 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              href={
                result.type === "notes"
                  ? `/dashboard/notes/${result.record._id}`
                  : `/documents/${result.record._id}`
              }
              key={
                result.type === "notes"
                  ? result.record.text
                  : result.record.title
              }
            >
              {result.type === "notes" ? (
                <TextBlock
                  text={result.record.text.substring(0, 400) + "..."}
                  type="note"
                />
              ) : (
                <TextBlock
                  text={result.fileText.substring(0, 400) + "..."}
                  type="document"
                />
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
