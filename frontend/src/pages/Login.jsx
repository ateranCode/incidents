import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alert from '../components/Alert'
import useAuth from '../hooks/useAuth'
import logoBVC from '../../public/logo.png'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/login', { email, password })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
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
            <div className="w-80 mx-auto px-5 py-10 rounded-lg shadow-lg bg-white">
                <div>
                    <form onSubmit={handleSubmit}>
                        <img className='logo rounded-full mx-auto mb-5' src={logoBVC} alt="" />
                        {msg && <Alert
                            alerta={alerta}
                        />}
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="password"
                                placeholder="Clave"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            value="Iniciar sesión"
                            className='text-sm cursor-pointer bg-sky-900 hover:bg-sky-950 w-full p-2 rounded-xl text-white'
                            type="submit" />
                    </form>
                    <nav className='mt-5 text-sm'>
                        <Link className='block text-gray-600 hover:text-gray-800 text-center' to="/registrar">¿No tienes una cuenta? <span>Regístrate</span></Link>
                        <Link className='block mt-3 text-gray-600 hover:text-gray-800 text-center' to="/olvide-clave">Recuperar Clave</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Login