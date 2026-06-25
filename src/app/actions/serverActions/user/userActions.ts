"use server"

import { prisma } from "@/db/prisma/prisma";
import { User } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import { UserType } from "../../clientActions/user/userActions";
import { prismaErrorHandler } from "@/utils/prismaErrorHandler/prismaErrorHandler";



export const getUsers = async () => {

    const users: Array<User> = await prisma.user.findMany();
    console.log("Find users:", users);
    return users;
}


export const createUser = async (data: UserType) => {
    return prismaErrorHandler(async () => {
        const userCreateData: UserType = {
            ...data,
            password: bcrypt.hashSync(data.password, parseInt(process.env.SALT as string))
        }

        const user: User = await prisma.user.create({
            data: userCreateData
        });

        return user;
    })
}