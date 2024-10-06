import { action, internalQuery } from "./_generated/server";
import { embed } from "./notes";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

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

    const documents = await ctx.runQuery(internal.search.getDocuments, {
      documentIds: documentResults.map((doc) => doc._id),
    });

    if (!documents) {
      return null;
    }

    const fileIds = documents
      .filter(
        (doc): doc is typeof doc & { fileId: Id<"_storage"> } => !!doc?.fileId
      )
      .map((doc) => doc.fileId);

    const filesTexts = await ctx.runQuery(internal.search.getFilesTexts, {
      fileIds,
    });

    const filesTextsMap = new Map<Id<"_storage">, string>();
    filesTexts.forEach(({ id, fileText }) => {
      if (!id || !fileText) {
        return null;
      }
      filesTextsMap.set(id, fileText);
    });

    if (!filesTexts) {
      return null;
    }

    const records: (
      | { type: "notes"; record: Doc<"notes"> }
      | {
          type: "documents";
          record: Doc<"documents">;
          fileText: string | String;
        }
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

          const fileText = await filesTextsMap.get(document.fileId);

          if (!fileText) {
            return;
          }

          records.push({
            type: "documents",
            record: document,
            fileText: fileText,
          });
        })
        .filter(Boolean)
    );

    return records;
  },
});

export const getDocuments = internalQuery({
  args: {
    documentIds: v.array(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const documents = await Promise.all(
      args.documentIds.map(async (id) => await ctx.db.get(id))
    );
    return documents;
  },
});

export const getFilesTexts = internalQuery({
  args: {
    fileIds: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const files = await Promise.all(
      args.fileIds.map(async (id) => {
        const fileText = await ctx.storage.getUrl(id);
        return { id, fileText };
      })
    );
    return files;
  },
});
