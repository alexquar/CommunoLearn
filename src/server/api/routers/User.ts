import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { User } from "@prisma/client";
export const userRouter = createTRPCRouter({
  
    newUser: publicProcedure
    .input(z.object({ 
        name: z.string().min(1),
        email: z.string().min(1),
    }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.user.create({
            data: {
                name: input.name,
                email: input.email,
            }
        })
    })
  

});
