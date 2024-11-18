import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Nav from "../components/Nav"

const ProtectedRoute = () => {

    const { auth, cargando } = useAuth()

    if (cargando) return 'Cargando...'
    return (
        <>
            <Header />
            <Nav />

            {auth?._id ? (
                <Outlet />
            ) : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute