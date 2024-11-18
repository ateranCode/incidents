import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alert from '../components/Alert'

const Register = () => {

    const [name, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setClave] = useState('')
    const [repetirClave, setRepetirClave] = useState('')

    const [alerta, setAlerta] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        if ([name, email, password, repetirClave].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return;
        }

        if (password !== repetirClave) {
            setAlerta({ msg: 'Su clave no coincide', error: true })
            return;
        }

        if (password.length < 6) {
            setAlerta({ msg: 'La clave de acceso debe tener un mínimo de 6 caracteres', error: true })
            return;
        }

        setAlerta({})

        // Crear el usuario en la api
        try {
            const url = `/registrar`
            await clienteAxios.post(url, { name, email, password })
            setAlerta({
                msg: 'REGISTRADO EXITOSAMENTE, REVISA TU EMAIL',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <div className="w-96 mx-auto px-5 py-10 rounded-lg shadow-lg bg-white">
                <div>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-2xl font-semibold text-black">Crear cuenta</h1>
                        {msg && <Alert
                            alerta={alerta}
                        />}
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="password"
                                placeholder="Clave"
                                value={password}
                                onChange={e => setClave(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="password"
                                placeholder="Confirmar Clave"
                                value={repetirClave}
                                onChange={e => setRepetirClave(e.target.value)}
                            />
                        </div>
                        <input
                            value="Registrar"
                            className='text-sm cursor-pointer bg-sky-900 hover:bg-sky-950 w-full p-2 rounded-xl text-white mt-5'
                            type="submit" />
                    </form>

                    <nav className='mt-5 text-sm'>
                        <Link className='block text-gray-600 hover:text-gray-800 text-center' to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                    </nav>

                </div>
            </div>
        </>
    )
}

export default Register