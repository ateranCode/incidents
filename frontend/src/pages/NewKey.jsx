import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alert from '../components/Alert'

const NewKey = () => {

    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/olvide-password/${token}`)
                setAlerta({
                    msg: 'Ingresar nueva Clave'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'La clave debe contener al menos 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const url = `/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }


    const { msg } = alerta

    return (
        <div className="w-96 mx-auto px-5 py-10 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-semibold text-black">Cambio de clave</h1>
            {msg && <Alert
                alerta={alerta}
            />}
            {tokenValido && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Nueva clave"
                            />
                        </div>
                        <input
                            value='Aceptar'
                            className='text-sm cursor-pointer bg-sky-900 hover:bg-sky-950 w-full p-2 rounded-xl text-white mt-5'
                            type="submit"
                        />
                    </form>


                </>
            )}

            {passwordModificado && (
                <Link className='block text-gray-600 hover:text-gray-800 text-center' to="/">Inicia sesión</Link>
            )}

        </div>
    )
}

export default NewKey   