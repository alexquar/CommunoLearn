import { use } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Stage } from "@prisma/client";
export const todoRouter = createTRPCRouter({
  //get a todo
  getTodoById: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async({ ctx, input }) => {
    return await ctx.db.todo.findUnique({
      where: {
        id: input.id
      },
    })
  }),

  //delete a todo
  deleteTodo: protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.todo.delete({
      where: {
        id: input.id
      }
    })
  }),

  //create a new todo
  newTodo: protectedProcedure
  .input(z.object({ 
    title: z.string().min(1), 
    content: z.string().min(1), 
    userId: z.string().min(1),
    projectId: z.number()
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.todo.create({
      data: {
        title: input.title,
        content: input.content,
        createdBy: {
          connect: {
            id: input.userId
          }
        },
        Project: {
          connect: {
            id: input.projectId
          }
        }
      }
    })
  }),

  //update a todo
  updateTodo: protectedProcedure
  .input(z.object({ 
    id: z.number(),
    title: z.string().min(1), 
    content: z.string().min(1), 
    stage: z.nativeEnum(Stage),
    done: z.boolean()
  }))
  .mutation(async({ ctx, input }) => {
    return await ctx.db.todo.update({
      where: {
        id: input.id
      },
      data: {
        title: input.title,
        content: input.content,
        stage: input.stage,
        done: input.done
      }
    })
  }),
  //get to dos in a certain stage
  getToDosInAStage: publicProcedure
  .input(z.object({
    id:z.number(),
    stage:z.nativeEnum(Stage)
  })
)
  .query(async({ctx,input})=>{
    return await ctx.db.todo.findMany({
      where:{
        id:input.id,
        stage:input.stage
      }
    })
  }),

});
