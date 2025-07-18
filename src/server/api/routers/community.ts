import { put } from "@vercel/blob";
import { z } from "zod";
import {
  createTRPCRouter,
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
    communityType: z.string().min(1),
    createdById: z.string().min(1),
    icon: z.string().min(1)
  }))
  .mutation(async({ ctx, input }) => {
    const buffer = Buffer.from(input.icon, "base64");
    const blob = await put(`community/${input.name}/${input.createdById}`, buffer, {
                access: "public",
            });
    return await ctx.db.community.create({
      data: {
        name: input.name,
        aboutCommunity: input.aboutCommunity,
        private: input.private ?? null,
        password: input.password ?? null,
        locationCommunity: input.locationCommunity,
        sloganCommunity: input.sloganCommunity,
        numberOfMembers: 1,
        icon: blob.url,
        createdBy: 
        {
          connect: { id: input.createdById }
        },
        members: {
          connect: { id: input.createdById }
        },
        
        ownerEmail: input.ownerEmail,
        communityType: input.communityType,
        //will need to do actual user eventually
      }
    })
  }),

  //get a community by its name for the search bar
  getCommunityByName: publicProcedure
  .input(z.object({ name: z.string(), country: z.string().optional(), communityType: z.string().optional() }))
  .query(async({ ctx, input }) => {
    if (input.country && input.communityType) {
      return await ctx.db.community.findMany({
        where: {
          name: {
            contains: input.name,
            mode: 'default'
          },
          locationCommunity: input.country,
          communityType: input.communityType,
          private: false
        }
      })}
    if (input.country) {
        return await ctx.db.community.findMany({
          where: {
            name: {
              contains: input.name,
              mode: 'default'
            },
            locationCommunity: input.country,
            private: false
          }
        });
      }
    if (input.communityType) {
      return await ctx.db.community.findMany({
        where: {
          name: {
            contains: input.name,
            mode: 'default'
          },
          communityType: input.communityType,
          private: false
        }
      });
    }
    return await ctx.db.community.findMany({
      where: {
        name: {
          contains: input.name,
          mode: 'default'
        },
        private: false
      }
    });
  }),

  getSomeCommunitiesByName: publicProcedure
  .input(z.object({ name: z.string(), communityType: z.string().optional(), country: z.string().optional()
   }))
  .query(async({ ctx, input }) => {
    if (input.country && input.communityType) {
      return await ctx.db.community.findMany({
        where: {
          name: {
            contains: input.name,
            mode: 'default'
          },
          locationCommunity: input.country,
          communityType: input.communityType,
          private: false
        },
        take: 10
      })}
    if (input.country) {
        return await ctx.db.community.findMany({
          where: {
            name: {
              contains: input.name,
              mode: 'default'
            },
            locationCommunity: input.country,
            private: false
          },
          take: 10
        });
      }
    if (input.communityType) {
      return await ctx.db.community.findMany({
        where: {
          name: {
            contains: input.name,
            mode: 'default'
          },
          communityType: input.communityType,
          private: false
        },
        take: 10
      });
    }
    return await ctx.db.community.findMany({
      where: {
        name: {
          contains: input.name,
          mode: 'default'
        },
        private: false
      },
      take: 10
    });
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
      take: 6
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
        },
        include:{
          createdBy: {
            select:{
              firstName: true,
              lastName: true,
              email: true,
              id: true
            }
          },
          projectMembers: {
            select:{
              id: true,
              firstName: true,
              lastName: true,
              email: true
            },
          },
        }
      },
      Comments:{
        include:{
          commentedBy: true
        },
        orderBy:{
          createdAt: "desc"
        }
      },
      createdBy: true,
      meetings: {
        orderBy:{
          meetingTime:"desc"
        },
        include:{
          AssociatedProject: true,
          createdBy: true,
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
      },
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
    ownerEmail: z.string().min(1),
    icon: z.string().optional()
  }))
  .mutation(async({ ctx, input }) => {
    if(input.icon){
    const buffer = Buffer.from(input.icon, "base64");
    const blob = await put(`community/${input.name}/${input.id}`, buffer, {
                access: "public",
            });
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
        ownerEmail: input.ownerEmail,
        icon: blob.url,
      }
    })
    }
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
        ownerEmail: input.ownerEmail,
      }
    })
  })
})
