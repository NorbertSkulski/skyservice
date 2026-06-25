"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAppMutation = (quertKey: Array<string>, mutationFunction: Function) => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (mutationData: Object) => mutationFunction(mutationData),

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
            queryClient.setQueryData(quertKey, context?.previousData);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: quertKey });
        },
    });
}