"use server"

import { prisma } from "@/db/prisma/prisma";
import { User } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

export type UserType = Omit<User,'id'>;


export const getUsers = async () => {
    
    const users: Array<User> = await prisma.user.findMany();
    console.log("Find users:", users);
    return users;
}


export const createUser = async (data:UserType) => {

        console.log("UserType1",data)

    const userCreateData:UserType = {
        ...data,
        password:bcrypt.hashSync(data.password, parseInt(process.env.SALT as string))
    }

    console.log("UserType2",userCreateData)

    const user: User = await prisma.user.create({
       data:userCreateData
    });
    console.log("Create user:", user);
    return user;
}