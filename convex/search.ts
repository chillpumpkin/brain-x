import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { embed } from "./notes";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export const searchAction = action({
  args: {
    searchInput: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const embedding = await embed(args.searchInput);

    const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });

    var documentResults = await ctx.vectorSearch("documents", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });

    const document = await ctx.runQuery(internal.search.getDocument, {
        documentId: documentResults[0]._id,
    });

    if (!document) {
      return null;
    }

    const documentText = await ctx.storage.getUrl(document.fileId);

    if (!documentText) {
      return null;
    }

    const records: (
      | { type: "notes"; record: Doc<"notes"> }
      | { type: "documents"; record: Doc<"documents">; documentText: string }
    )[] = [];

    await Promise.all(
      noteResults
        .map(async (noteResult) => {
          const note = await ctx.runQuery(api.notes.getNote, {
            noteId: noteResult._id,
          });

          if (!note) {
            return;
          }

          records.push({ type: "notes", record: note });
        })
        .filter(Boolean)
    );

    await Promise.all(
      documentResults
        .map(async (documentResult) => {
          const document = await ctx.runQuery(api.documents.getDocument, {
            documentId: documentResult._id,
          });

          if (!document) {
            return;
          }

          records.push({
            type: "documents",
            record: document,
            documentText: documentText,
          });
        })
        .filter(Boolean)
    );

    return records;
  },
});

export const getDocument = internalQuery({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
      return ctx.db.get(args.documentId);
    },
  });