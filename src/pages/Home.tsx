import { useAuth } from "../hooks/useAuth"
export default function Home(){
    const {onLogout} = useAuth();

    return(
        <div>
            <h1>
            Welcome to the Home page
            </h1>
            <button onClick={() => { onLogout()}} className="p-5 bg-slate-300 m-5 border rounded hover:cursor-pointer">Sign Out</button>
        </div>
    )

}