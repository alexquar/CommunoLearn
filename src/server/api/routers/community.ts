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

    getCommunity: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async({ ctx, input }) => {
      return await ctx.db.community.findUnique({
          where: {
              id: input.id
          }
      })
    }),

    newCommunity: publicProcedure
    .input(z.object({ 
        name: z.string().min(1), 
        aboutCommunity: z.string().min(1), 
        private: z.boolean(),
        password: z.string().min(1),
        locationCommunity: z.string().min(1),
        sloganCommunity: z.string().min(1),
    }))
    .mutation(async({ ctx, input }) => {
      return await ctx.db.community.create({
          data: {
              name: input.name,
              aboutCommunity: input.aboutCommunity,
              private: input.private ?? null,
              password: input.password,
              locationCommunity: input.locationCommunity,
              sloganCommunity: input.sloganCommunity,
              numberOfMembers: 1,
              //need a user here
              createdBy: 
              {
                  connect: { id: 'cm2avbnnf0000buxc4t44yo3p' }
              }
              //will need to do actual user eventually
          }
      })
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
