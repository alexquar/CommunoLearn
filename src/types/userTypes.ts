import { type Prisma } from "@prisma/client";

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        Projects: true,
        OwnedProjects: true,
        Communities: true,
        OwnedCommunities: true,
        Meetings: true,
        Comments: true,
        createdTodos: true,
        assignedTodos: true,
    }
}>;


export type MemberOf = Prisma.UserGetPayload<{
    select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        image: true;
    }
}>;