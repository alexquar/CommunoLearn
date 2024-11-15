import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { location } from "@prisma/client";
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
        location: z.nativeEnum(location),
        firstName: z.string(),
        lastName: z.string(),
    }))
    .mutation(async({ ctx, input }) => {
        const res = await ctx.db.user.create({
            data: {
                email: input.email,
                location: input.location,
                firstName: input.firstName,
                lastName: input.lastName,
            }
        })
        console.log(res)
        return "success"
    }),

    //update a user
    updateUser: publicProcedure
    .input(z.object({ 
        id: z.string(),
        name: z.string().min(1),
        email: z.string().min(1),
        dateOfBirth: z.date().optional(),
        location: z.nativeEnum(location),
        firstName: z.string(),
        lastName: z.string(),
        aboutMe: z.string().optional(),
        image: z.string().optional(),
    }))
    .mutation(async({ ctx, input }) => {
        return await ctx.db.user.update({
            where: {
                id: input.id
            },
            data: {
                email: input.email,
                dateOfBirth: input.dateOfBirth,
                location: input.location,
                firstName: input.firstName,
                lastName: input.lastName,
                aboutMe: input.aboutMe,
                image: input.image,
            }
        })
    }),
    

    //delete a user
    deleteUser: publicProcedure
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
