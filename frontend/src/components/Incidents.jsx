import useCustomers from "../hooks/useCustomers"
import Customer from "./Customer"

const Incidents = () => {

    const { clientes } = useCustomers()

    return (
        <>
            {clientes.length ?
                (
                    <>
                        <h2 className="text-sky-800 font-semibold text-2xl text-center mb-5">Lista de incidencias</h2>

                        <table className='table w-full border-separate lg:border-collapse'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-400 px-4 py-2 text-sm'>Cliente</th>
                                    <th className='border border-gray-400 px-4 py-2 text-sm'>Fecha del caso</th>
                                    <th className='border border-gray-400 px-4 py-2 text-sm'>CI / Código de grupo</th>
                                    <th className='border border-gray-400 px-4 py-2 text-sm'>Detalles</th>
                                    <th className='border border-gray-400 px-4 py-2 text-sm'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clientes.map(cliente => (
                                        <Customer
                                            key={cliente._id}
                                            cliente={cliente}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                ) :
                (
                    <>
                        <h2 className="text-sky-800 font-semibold text-2xl text-center">No hay incidencias</h2>
                    </>
                )}
        </>
    )
}

export default Incidents