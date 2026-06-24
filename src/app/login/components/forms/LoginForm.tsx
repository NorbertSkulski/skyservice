"use client"
import SkyButton from "@/components/buttons/SkyButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


type LoginFormProps = {
    data: any
}



const LoginForm = (props: LoginFormProps) => {
    
     const router = useRouter();

    const { data } = props

    const login = async () => {

        const res = await signIn("credentials", {
            login: "norbert",
            password: "test",
            redirect: false
        })

        if(!res.error && res.url){
            const urlObj = new URL(res.url);
            const callbackUrl = urlObj.searchParams.get("callbackUrl")||"/dashboard";            
            router.push(callbackUrl);
        }        

        console.log("login user:",res)
    };


    return <div>
        {data.test}
        <SkyButton onClick={login}>Click</SkyButton>
    </div>;

}

export default LoginForm;