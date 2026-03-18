import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const deleteTask = mutation({
  args: {
    id: v.id("projects"),

    ownerId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const project = await ctx.db.get(args.id);
    if (project?.ownerId !== identity.subject) throw new Error("Forbidden");
    await ctx.db.delete(args.id);
  },
});
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.insert("projects", {
      name: args.name,
      ownerId: identity?.subject,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .collect();
  },
});
