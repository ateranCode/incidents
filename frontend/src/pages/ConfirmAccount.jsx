import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alert'

const ConfirmAccount = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg,
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                })
            }

            setCargando(false)
        }
        confirmarCuenta()
    }, [])

    return (
        <>
            <div className="w-96 mx-auto px-5 py-10 rounded-lg shadow-lg bg-white">
                {!cargando && <Alerta
                    alerta={alerta}
                />}

                {cuentaConfirmada && (
                    <nav className='mt-5 text-sm'>
                        <Link className='block text-gray-600 hover:text-gray-800 text-center' to="/">Iniciar sesión</Link>
                    </nav>
                )}
            </div>
        </>
    )
}

export default ConfirmAccount