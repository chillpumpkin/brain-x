import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createChatRecord = internalMutation({
  args: {
    documentId: v.id("documents"),
    text: v.string(),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("chats", {
      documentId: args.documentId,
      tokenIdentifier: args.tokenIdentifier,
      text: args.text,
      isHuman: args.isHuman,
    });
  },
});

export const getChatRecords = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("chats")
      .withIndex("by_documentId_tokenIdentifier", (q) =>
        q.eq("documentId", args.documentId).eq("tokenIdentifier", userId)
      )
      .collect();
  },
});
