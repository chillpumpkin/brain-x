"use client";

import { useState } from "react";
import SearchForm from "./search-form";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>
      <SearchForm setResults={setResults} />
      {results?.map((result) => {
        if (result.type === "notes") {
          return (
            <Link
              className="gap-2"
              href={`/dashboard/notes/${result.record._id}`}
              key={result.record.text}
            >
              <li className="border-1 border-black rounded-lg p-2">
                type : Note
                {result.record.text.substring(0, 400) + "..."}
              </li>
            </Link>
          );
        } else {
          return (
            <Link
              className="gap-2"
              href={`/documents/${result.record._id}`}
              key={result.record.title}
            >
              <li className="border-1 border-black rounded-lg p-2">
                type : Document
                {result.documentText.substring(0, 400)}
              </li>
            </Link>
          );
        }
        return null;
      })}
    </main>
  );
}
