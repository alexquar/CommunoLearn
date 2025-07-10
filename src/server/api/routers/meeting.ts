import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const meetingRouter = createTRPCRouter({
  
  // get a meeting by its id
  getMeetingById: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.meeting.findUnique({
      where: {
      id: input.id
      },
      include: {
      createdBy: true,
      AssociatedCommunity: {
        include: {
          members: true
      },
    },
      AssociatedProject: {
        select: {
        id: true,
        title: true
        },
      },
      Comment:{
        include:{
          commentedBy: true
        },
        orderBy:{
          createdAt: "desc"
        }
      }
      }
    })
  }),

  //create a new meeting
  createNewMeeting: publicProcedure
  .input(z.object({ 
    title: z.string().min(1), 
    meetingLocationOrLink: z.string().min(1),
    meetingTime: z.date(),
    createdBy: z.string().min(1),
    AssociatedCommunity: z.number(),
    AssociatedProject: z.number(),
    inPerson: z.boolean(),
    meetingDocuments: z.array(z.string()).optional(),
    content: z.string().min(1),
    length: z.number().min(.25).max(24).default(1.00)
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.meeting.create({
      data: {
        title: input.title,
        content: input.content,
        meetingLocationOrLink: input.meetingLocationOrLink,
        inPerson: input.inPerson,
        meetingTime: input.meetingTime,
        meetingDocuments: input.meetingDocuments,
        length: input.length,
        createdBy: {
        connect: {
          id: input.createdBy
        }
        },
        AssociatedCommunity: {
        connect: {
          id: input.AssociatedCommunity
        }
        },
        AssociatedProject: {
        connect: {
          id: input.AssociatedProject
        }
        }
      }
    })
  }),

  //delete a meeting
  deleteMeetingById: publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.meeting.delete({
      where: {
        id: input.id
      }
    })
  }),

  //update 
  updateMeetingById: publicProcedure
  .input(z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    meetingLocationOrLink: z.string().min(1),
    meetingTime: z.date(),
    inPerson: z.boolean(),
    meetingDocuments: z.array(z.string()).optional(),
    done: z.boolean(),
    length: z.number().min(.25).max(24).default(1.00)
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.meeting.update({
      where: {
        id: input.id
      },
      data: {
        title: input.title,
        content: input.description,
        meetingLocationOrLink: input.meetingLocationOrLink,
        inPerson: input.inPerson,
        meetingTime: input.meetingTime,
        meetingDocuments: input.meetingDocuments,
        done: input.done
        ,length: input.length
        }
      })
    })




  

});
