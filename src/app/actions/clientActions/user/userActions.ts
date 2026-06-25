"use client"

import { User } from "@/generated/prisma/client"
import { useAppMutation } from "../utils/globalQueryActions"
import { createUser } from "../../serverActions/user/userActions";

export type UserType = Omit<User,'id'>;

export const useCreateMutationUser = () => {
    return useAppMutation(["users"],(data:UserType)=>createUser({...data}))
}