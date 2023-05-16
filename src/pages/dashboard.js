import { useRouter } from "next/router"
import { supabase } from "../../supabase";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Dashboard(){

    const router = useRouter();

    const [loggedUser, setLoggedUser] = useState(null);

    useAuth();

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error){
            console.error(error);
        }else{
            router.push('/');
        }
    };

    useEffect(()=>{
        const getUser = async () => {
            const {data: { session } } = await supabase.auth.getSession();
            
            if(!session){
               return;
            }
            setLoggedUser(session.user.user_metadata.name);        
        };
        getUser();
    }, []);
         
    return (
        <main style={{
            display:'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems:'center',
            justifyContent:'center',
            width:'100vw',
            height:'100vh',
        }}>
            <title>Dashboard</title>
            <h2>Olá, {loggedUser}</h2>
            <span>Somente usuário autenticado</span>
            <button onClick={handleSignOut}>Sair</button>
        </main>
    )
}