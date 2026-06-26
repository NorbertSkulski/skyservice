"use client"

import { useAppMutation } from "../utils/globalQueryActions"
import { createUser, getUsers } from "../../serverActions/user/userActions";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/generated/prisma/client";

export type UserType = Omit<Partial<User>, 'id'> & Required<Pick<User, "password"| "login">>;

export const useCreateMutationUser = () => {
    return useAppMutation(["users"], (data: UserType) => createUser(data))
}

export const useGetUsersQuery = () => {
    return useQuery({ queryKey: ['users'], queryFn: () => getUsers() })
}
