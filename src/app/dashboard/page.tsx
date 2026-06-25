"use client"

import SkyButton from "@/components/buttons/SkyButton";
import { getUsers } from "@/serverActions/user/userActions";
import { useQuery,  } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const Dashboard = () => {

    // 2. ZAPIS: Łączymy useMutation z Server Action + Optimistic Updates (dla trybu offline)
    // const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: ({ title, content }: { title: string; content: string }) => 
//       createPostAction(title, content),
    
//     // Krok opcjonalny, ale kluczowy dla Offline-First (Optimistic Update):
//     onMutate: async (newPost) => {
//       // Anulujemy bieżące zapytania, żeby nie nadpisać naszego "szybkiego" UI
//       await queryClient.cancelQueries({ queryKey: ['posts'] });

//       // Pobieramy aktualny stan z cache (z IndexedDB)
//       const previousPosts = queryClient.getQueryData(['posts']);

//       // Optymistycznie dodajemy nowy post do UI zanim serwer odpowie
//       queryClient.setQueryData(['posts'], (old: any) => [
//         { id: Math.random().toString(), createdAt: new Date(), ...newPost },
//         ...(old || []),
//       ]);

//       // Zwracamy poprzedni stan na wypadek błędu (rollback)
//       return { previousPosts };
//     },
//     // Jeśli serwer zwróci błąd, przywracamy stare dane
//     onError: (err, newPost, context) => {
//       queryClient.setQueryData(['posts'], context?.previousPosts);
//     },
//     // Jeśli wszystko się uda (lub nie), odświeżamy dane w tle
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });

    const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: ()=>getUsers() })

    console.log("Load data query:", data);


    if(isLoading){
        return <div>Loading Data!</div>
    }


    const logOut = async () => {
        await signOut();
    }

    return (
        <div >
            Dashbaord
            {data?.map((el,idx) => <p key={`user-${idx}`}>{el.firstName}</p>)}
            <SkyButton onClick={logOut} >Przycisk</SkyButton>
        </div>
    );
}

export default Dashboard;
