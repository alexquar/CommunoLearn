import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { commentCategory } from "@prisma/client";
import { Comment } from "@prisma/client";
export const commentRouter = createTRPCRouter({
  //get a user by its id
  createNewComment: publicProcedure
    .input(z.object({ 
        userId: z.string(),
        text: z.string().min(1),
        commentCategory: z.nativeEnum(commentCategory),
        projectId: z.number().optional(),
        meetingId: z.number().optional(),
        communityId: z.number().optional(),
        todoId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
        if(input.projectId === undefined && input.meetingId === undefined && input.communityId === undefined && input.todoId === undefined){
            throw new Error("Please provide a valid project, meeting, community or todo id");
        } else if(input.communityId){
            return await ctx.db.comment.create({
                data: {
                text: input.text,
                commentCategory: input.commentCategory,
                commentedBy:{
                    connect: {
                        id: input.userId
                }},
                associatedCommunity:{
                    connect: {
                        id: input.communityId
                }},
                },
            })
        } else if(input.projectId){
            return await ctx.db.comment.create({
                data: {
                text: input.text,
                commentCategory: input.commentCategory,
                commentedBy:{
                    connect: {
                        id: input.userId
                }},
                associatedProject:{
                    connect: {
                        id: input.projectId
                }},
                },
            })
        } else if(input.meetingId){
            return await ctx.db.comment.create({
                data: {
                text: input.text,
                commentCategory: input.commentCategory,
                commentedBy:{
                    connect: {
                        id: input.userId
                }},
                associatedMeeting:{
                    connect: {
                        id: input.meetingId
                }},
                },
            })
        } 
        else if(input.todoId){
            return await ctx.db.comment.create({
                data: {
                text: input.text,
                commentCategory: input.commentCategory,
                commentedBy:{
                    connect: {
                        id: input.userId
                }},
                associatedTodo:{
                    connect: {
                        id: input.todoId
                }},
                },
            })
        }
        throw new Error("Please provide a valid project, meeting, community or todo id");
     
    }),

    deleteCommentById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.comment.delete({
            where: {
                id: input.id
            }
        })
    }),




    
});
