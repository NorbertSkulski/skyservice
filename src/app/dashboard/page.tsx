"use client"

import SkyButton from "@/components/buttons/SkyButton";
import { signOut } from "next-auth/react";
import { useCreateMutationUser, useGetUsersQuery, UserType } from "../actions/clientActions/user/userActions";

const Dashboard = () => {

    const mutation = useCreateMutationUser();

    const { data, isLoading } = useGetUsersQuery();
    console.log("Load data query:", data);


    if (isLoading) {
        return <div>Loading Data!</div>
    }


    const logOut = async () => {
        await signOut();
    }

    const createUser = async (user: UserType) => {
        const userCreated = await mutation.mutateAsync(user);
        console.log("Create user:", userCreated);
    }

    return (
        <div >
            Dashbaord
            {data?.map((el, idx) => <p key={`user-${idx}`}>{el.firstName}</p>)}
            <SkyButton onClick={logOut} >Przycisk</SkyButton>
            <p>
                <SkyButton onClick={() => createUser({ login: 'norbert10', password: 'test', firstName: 'Norbert353', lastName: 'Kowalski', phone: "32313213", email: "tes2t@test.pl" })} >Create user</SkyButton>
            </p>
        </div>
    );
}

export default Dashboard;
