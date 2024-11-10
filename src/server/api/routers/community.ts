import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const communityRouter = createTRPCRouter({
  
  //get 10 communities 
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

  //get a community by its id 
  getCommunity: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.community.findUnique({
      where: {
        id: input.id
      },
    })
  }),

  //create a new community
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

  //get a community by its name for the search bar
  getCommunityByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.community.findUnique({
      where: {
        name: input.name
      }
    })
  }),

  getPrivateCommunityByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.community.findUnique({
      where: {
        name: input.name,
        private:true
      }
    })
  }),

  //get the top 10 communities for the home screen
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
    communities,
    };
  }),

  //add a user to a community
  addUserToCommunity: publicProcedure
  .input(z.object({ communityId: z.number(), userId: z.string() }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.community.update({
      where: {
      id: input.communityId
      },
      data: {
      numberOfMembers: {
        increment: 1
      },
      members: {
        connect: { id: input.userId }
      }
      }
    })
  }
),

//get a community with all of its projects and meetings
getCommunityWithRelations: publicProcedure
.input(z.object({ id: z.number() }))
.query(async({ ctx, input }) => {
  return await ctx.db.community.findUnique({
    where: {
      id: input.id
    },
    include: {
      projects: {
        orderBy: {
          createdAt: "desc"
        }
      },
      meetings: {
        orderBy:{
          meetingTime:"desc"
        }
      },
      members: true
    }
  })}),

  //delete a community by id
  deleteCommunity: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.community.delete({
      where: {
        id: input.id
      }
    })
  }),

  updateCommunityById: publicProcedure
  .input(z.object({
    id: z.number(),
    name: z.string().min(1),
    aboutCommunity: z.string().min(1),
    private: z.boolean(),
    password: z.string(),
    locationCommunity: z.string().min(1),
    sloganCommunity: z.string().min(1),
    communityType: z.string().min(1),
    ownerEmail: z.string().min(1)
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.community.update({
      where: {
        id: input.id
      },
      data: {
        name: input.name,
        aboutCommunity: input.aboutCommunity,
        private: input.private,
        password: input.password,
        locationCommunity: input.locationCommunity,
        sloganCommunity: input.sloganCommunity,
        communityType: input.communityType,
        ownerEmail: input.ownerEmail
      }
    })
  }),

})
