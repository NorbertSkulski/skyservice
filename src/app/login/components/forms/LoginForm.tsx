"use client"
import SkyButton from "@/components/buttons/SkyButton";
import SkyInput from "@/components/inputs/SkyInput";
import { User } from "@/generated/prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";


type LoginFormProps = Pick<User,"login" | "password">



const LoginForm = () => {

    const router = useRouter();

    const login = async () => {

        const res = await signIn("credentials", {
            login: "norbert",
            password: "test",
            redirect: false
        })
        console.log("login user:", res)

        if (!res.error && res.url) {
            const urlObj = new URL(res.url);
            const callbackUrl = urlObj.searchParams.get("callbackUrl") || "/dashboard";
            router.push(callbackUrl);
            return;
        }

        console.log("Logowanie nie powiodło się !")

    };


    const methods = useForm<LoginFormProps>({
        defaultValues: { login:"", password:"" }
    });
    

    const onSubmit = (data: LoginFormProps) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>

                <SkyInput
                    name="login"
                    label="Login"
                    type="text"
                    rules={{ required: 'Login jest obowiązkowy!' }}
                />

                <SkyInput
                    name="password"
                    type="password"
                    label="Hasło"
                    rules={{ required: 'Hasło jest obowiązkowe!' }}
                />

                <SkyButton type="submit">Zapisz</SkyButton>
            </form>
        </FormProvider>
    );
}

export default LoginForm;