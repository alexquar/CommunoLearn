import { type Prisma } from "@prisma/client";
export type CommentWithRelations = Prisma.CommentGetPayload<{
    include:{
        commentedBy: true,
    }
}>;