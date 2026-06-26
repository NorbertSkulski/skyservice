"use client"
import SkyButton from "@/components/buttons/SkyButton";
import SkyInput from "@/components/inputs/SkyInput";
import { User } from "@/generated/prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


type LoginFormProps = Pick<User, "login" | "password">



const LoginForm = () => {


    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const router = useRouter();

    const login = async (data: LoginFormProps) => {
        setIsLoading(true);
        const res = await signIn("credentials", {
            login: data.login,
            password: data.password,
            redirect: false
        })

        if (!res.error && res.url) {
            const urlObj = new URL(res.url);
            const callbackUrl = urlObj.searchParams.get("callbackUrl") || "/dashboard";
            router.push(callbackUrl);
            setIsLoading(false);
            setError(null);
            return;
        }

        console.log("Logowanie nie powiodło się !")
        setIsLoading(false);
        setError("Logowanie nie powiodło się !")
    };


    const methods = useForm<LoginFormProps>({
        defaultValues: { login: "", password: "" }
    });


    const onSubmit = (data: LoginFormProps) => {
        console.log(data)
        login(data);
    };

    return (
        <FormProvider {...methods}>
            <form className="border-blue-500 border-2 rounded-md p-2 flex flex-col justify-evenly items-center h-60 w-70" onSubmit={methods.handleSubmit(onSubmit)}>

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

                <SkyButton type="submit">Zaloguj</SkyButton>

                <div className="h-10">
                    {isLoading ? <span>Logowanie ...</span> : null}
                    {(error && !isLoading) ? <span className="text-red-500">{error}</span> : null}
                </div>
            </form>
        </FormProvider>
    );
}

export default LoginForm;