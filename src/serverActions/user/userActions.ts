"use server"

import { prisma } from "@/db/prisma/prisma";
import { User } from "@/generated/prisma/client";


export const getUsers = async () => {
    
    const users: Array<User> = await prisma.user.findMany();
    console.log("Find users:", users);
    return users;
}
