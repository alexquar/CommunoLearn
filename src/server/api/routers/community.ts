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
    ownerEmail: z.string().min(1),
    password: z.string(),
    locationCommunity: z.string().min(1),
    sloganCommunity: z.string().min(1),
    communityType: z.string().min(1)
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.community.create({
      data: {
        name: input.name,
        aboutCommunity: input.aboutCommunity,
        private: input.private ?? null,
        password: input.password ?? null,
        locationCommunity: input.locationCommunity,
        sloganCommunity: input.sloganCommunity,
        numberOfMembers: 1,
        //need a user here
        createdBy: 
        {
          connect: { id: 'cm2avbnnf0000buxc4t44yo3p' }
        },
        ownerEmail: input.ownerEmail,
        communityType: input.communityType,
        //will need to do actual user eventually
      }
    })
  }),

  getCommunityByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.community.findUnique({
      where: {
        name: input.name
      }
    })
  }),

  getTopCommunities: publicProcedure
  .query(async({ ctx }) => {
    const communities = await ctx.db.community.findMany(
    {
      orderBy: {
      numberOfMembers: 'desc'
      },
      take: 10
    }
    );
    return {
    loading: false,
    communities,
    };
  })

  
});
