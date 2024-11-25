import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type Message } from "@prisma/client";
export const communityRouter = createTRPCRouter({
  
    createNewMessage: publicProcedure
    .input(z.object({ 
        text: z.string().min(1), 
        fromId: z.string().min(1),
        conversationId: z.string().min(1),
    }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.message.create({
            data:{
                text: input.text,
                from: {
                    connect:{ id: input.fromId},
                },
                Conversation:{
                    connect:{ id: input.conversationId},
                }
            }
        })
    }),

    



    


})
