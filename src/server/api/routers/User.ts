import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { User } from "@prisma/client";
export const userRouter = createTRPCRouter({
  
    //get a user by its id
    getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async({ ctx, input }) => {
        return await ctx.db.user.findUnique({
        where: {
            id: input.id
        },
        })
    }),
    
    //create a new user
    newUser: publicProcedure
    .input(z.object({ 
        email: z.string().min(1), 
        name: z.string().min(1),
    }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.user.create({
            data: {
                email: input.email,
                name: input.name,
            }
        })
    }),

    //update a user
    updateUser: protectedProcedure
    .input(z.object({ 
        id: z.string(),
        name: z.string().min(1),
        email: z.string().min(1),
        dateOfBirth: z.date().optional(),
        location: z.string().optional(),
        nickName: z.string().optional(),
        aboutMe: z.string().optional(),
        image: z.string().optional(),
    }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.user.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                email: input.email,
                dateOfBirth: input.dateOfBirth,
                location: input.location,
                nickName: input.nickName,
                aboutMe: input.aboutMe,
                image: input.image,
            }
        })
    }),
    

    //delete a user
    deleteUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.user.delete({
            where: {
                id: input.id
            }
        })
    }),

    getUserByIdWithRelations: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async({ ctx, input }) => {
        return await ctx.db.user.findUnique({
            where: {
                id: input.id
            },
            include: {
                Projects: {
                    where:{
                        AssociatedCommunity:{
                            private: false
                        }
                        }
                    },
                Meetings: {
                    where:{
                        AssociatedCommunity:{
                            private: false
                        }
                    }
                },
                Communities: {
                    where:{
                        private: false
                    }
                },
                OwnedCommunities: {
                    where:{
                        private: false
                    }
                }
            }
        })
    }),
  

});
