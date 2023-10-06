// Provides the main layout for the application after signing in.
import { Outlet } from "react-router-dom"
import PrimarySearchAppBar from '../components/PrimarySearchAppBar'

export default function MainLayout(){
    return(
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <h1>Main layout</h1>
            <Outlet></Outlet>
        </div>
    )
}