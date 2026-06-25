"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";

export const useAppMutation = (quertKey: Array<string>, mutationFunction: Function) => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (mutationData: Object) => {
            const response = await mutationFunction(mutationData);

            if (response && response.error) {
                throw new Error(response.error);
            }

            return response;
        },

        onMutate: async (newPost) => {

            await queryClient.cancelQueries({ queryKey: quertKey });

            const previousData = queryClient.getQueryData(quertKey);

            queryClient.setQueryData(['posts'], (old: any) => [
                { id: Math.random().toString(), createdAt: new Date(), ...newPost },
                ...(old || []),
            ]);

            return { previousData };
        },

        onError: (err, newPost, context) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            queryClient.setQueryData(quertKey, context?.previousData);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: quertKey });
        },
    });
}