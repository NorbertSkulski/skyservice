"use client"

import SkyButton from "@/components/buttons/SkyButton";
import { signOut } from "next-auth/react";


const Dashboard = () => {


    const logOut = async () => {
        await signOut();
    }

    return (
        <div >
            Dashbaord
            <SkyButton onClick={logOut} >Przycisk</SkyButton>
        </div>
    );
}

export default Dashboard;
