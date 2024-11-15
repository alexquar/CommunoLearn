import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
    
  //get a project by its id
    getProjectById: publicProcedure.input(z.object({ projectId: z.number() })) 
    .query(async({ ctx, input }) => {
      return await ctx.db.project.findUnique(
            {
                where: {
                    id    : input.projectId
                },
            }
    );
}),

getProjectByIdWithRelations: publicProcedure.input(z.object({ projectId: z.number() })) 
    .query(async({ ctx, input }) => {
      return await ctx.db.project.findUnique(
            {
                where: {
                    id    : input.projectId
                },
                include: {
                    projectMembers: true,
                    createdBy: true,
                    Meetings: true,
                    todos: {
                      include:{
                        assignedUser: true
                      }
                    }
                }
            }
    );
}),
    
    //create a new project
    newProject: publicProcedure
      .input(z.object({ 
        title: z.string().min(1),
        description: z.string().min(1),
        endDate: z.date(),
        userId: z.string().min(1),
        communityId: z.number()
      }))
      .mutation(async({ ctx, input }) => {
        return await ctx.db.project.create({
            data: {
                title: input.title,
                description: input.description,
                endDate: input.endDate,
                createdBy: {
                    connect: { id: input.userId }
                },
                AssociatedCommunity:{
                    connect: { id: input.communityId  }
                }
            }
        })
      }),

      //add a project member
      addProjectMemberById: publicProcedure
      .input(z.object({
        projectId: z.number(),
        userId: z.string().min(1)
      }))
      .mutation(async({ ctx, input }) => {
        return await ctx.db.project.update({
            where: {
                id: input.projectId
            },
            data: {
                projectMembers: {
                    connect: { id: input.userId }
                }
            }
        })
      }),

      //delete a project
      deleteProjectById: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async({ ctx, input }) => {
        return await ctx.db.project.delete({
            where: {
                id: input.id
            }
        })
      }),

      //update a project
      updateProjectById: publicProcedure 
      .input(z.object({
        id: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        endDate: z.date()
      }))
      .mutation(async({ ctx, input }) => {
        return await ctx.db.project.update({
            where: {
                id: input.id
            },
            data: {
                title: input.title,
                description: input.description,
                endDate: input.endDate
            }
        })
      }),

    getAllUsersInProject: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async({ ctx, input }) => {
      return await ctx.db.project.findUnique({
          where: {
              id: input.projectId
          },
          include: {
              projectMembers: true
          },
      })
    })

});
