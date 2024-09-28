import { defineSchema, defineTable, TableDefinition } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.string(),
    fileId: v.id("_storage"),
  })
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    })
    .index("by_tokenIdentifier", ["tokenIdentifier"]),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    text: v.string(),
    isHuman: v.boolean(),
  }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
  notes: defineTable({
    text: v.string(),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.string(),
  })
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    })
    .index("by_tokenIdentifier", ["tokenIdentifier"]),
});
