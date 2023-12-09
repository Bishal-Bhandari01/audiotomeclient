import { Outlet } from "react-router-dom"
import NavBar from "../theme/Navbar"
import Player from "../player/Player"

export const Layout = () => {

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
} 