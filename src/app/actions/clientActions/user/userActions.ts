"use client"

import { User } from "@/generated/prisma/client"
import { useAppMutation } from "../utils/globalQueryActions"
import { createUser, getUsers } from "../../serverActions/user/userActions";
import { useQuery } from "@tanstack/react-query";

export type UserType = Omit<User,'id'>;

export const useCreateMutationUser = () => {
    return useAppMutation(["users"],(data:UserType)=>createUser({...data}))
}

export const useGetUsersQuery = ()=>{
    return useQuery({ queryKey: ['users'], queryFn: () => getUsers() })
}
