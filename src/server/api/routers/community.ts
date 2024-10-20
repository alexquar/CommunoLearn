import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const communityRouter = createTRPCRouter({
  
  getCommunities: publicProcedure
    .query(async({ ctx }) => {
      return {
        communities: await ctx.db.community.findMany(
            {
                where: {
                    private : false
                },
                take: 10
            }
        ),
      };
    }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });

//     return post ?? null;
//   }),

});
