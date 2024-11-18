import useCustomers from "../hooks/useCustomers"

const Customer = ({ cliente }) => {

    const { setEdicion } = useCustomers()

    const { date, details, identity, name, _id } = cliente

    console.log(date)

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(nuevaFecha)
    }

    console.log(date)

    return (
        <tr className='bg-gray-200'>
            <td className='border border-gray-400 px-2 py-1 text-sm'>{name}</td>
            <td className='border border-gray-400 px-2 py-1 text-sm'>{formatearFecha(date)}</td>
            <td className='border border-gray-400 px-2 py-1 text-sm'>{identity}</td>
            <td className='border border-gray-400 px-2 py-1 text-sm'>{details}</td>
            <td className='border border-gray-400 px-2 py-1 text-sm'>
                <div className='flex gap-5 justify-center my-3'>
                    <button
                        type='button'
                        className='py-2 px-2 rounded-lg bg-green-700 text-white text-sm'
                        onClick={() => setEdicion(cliente)}
                    >Editar</button>
                    <button
                        type='button'
                        className='py-2 px-5 rounded-lg bg-red-500 text-white text-sm'
                    >Eliminar</button>
                </div>
            </td>
        </tr>
    )
}

export default Customer