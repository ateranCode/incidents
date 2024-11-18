import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../config/axios'

const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email === '' || email.length < 6) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true,
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/olvide-password', { email })
            console.log(data)
            setAlerta({
                msg: data.msg
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
            <div className="w-80 mx-auto px-5 py-10 rounded-lg shadow-lg bg-white">
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-semibold text-black">Recuperar Acceso</h1>
                        {msg && <Alert
                            alerta={alerta}
                        />}
                        <div className="mt-5">
                            <input
                                className="border w-full p-2 bg-gray-50 rounded-xl text-sm"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email del registro"
                            />
                        </div>
                        <input
                            value='Recuperar'
                            className='text-sm cursor-pointer bg-sky-900 hover:bg-sky-950 w-full p-2 rounded-xl text-white mt-5'
                            type="submit"
                        />
                    </form>

                    <nav className='mt-5 text-sm'>
                        <Link className='block text-gray-600 hover:text-gray-800 text-center' to="/">Volver atrás</Link>
                    </nav>

                </div>
            </div>
        </>
    )
}

export default ForgetPassword