import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Nav = () => {

  const { cerrarSesion } = useAuth()
  return (
    <nav className="w-screen flex mb-8">
      <ul className="flex flex-col text-center md:flex-row w-screen md:justify-end gap-1 md:gap-3 bg-neutral-100 shadow-sm p-1">
        <Link to="/admin" className="text-sm ml-10 text-gray-600 hover:text-zinc-950 p-2 duration-200">Panel de control</Link>
        <Link to="incidencias" className="text-sm ml-10 text-gray-600 hover:text-zinc-950 p-2 duration-200">Incidencias</Link>
        <Link to="/incidencias" className="text-sm ml-10 text-gray-600 hover:text-zinc-950 p-2 duration-200">Configuración</Link>
        <button
          type="button"
          className="text-sm ml-10 text-gray-600 hover:text-zinc-950 p-2 duration-200 md:mr-2"
          onClick={cerrarSesion}
        >Cerrar sesión</button>
      </ul>
    </nav>
  )
}

export default Nav