import { useAuth } from "../hooks/useAuth"
import ConvertPanel from "../components/ConvertPanel";

export default function Home() {
  const { onLogout } = useAuth();

  return (
    <div>

      <ConvertPanel></ConvertPanel>

      <button onClick={() => { onLogout() }} className="p-5 bg-slate-300 m-5 border rounded hover:cursor-pointer">Sign Out</button>
    </div>
  )

}