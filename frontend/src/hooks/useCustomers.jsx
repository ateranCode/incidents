import { useContext } from 'react'
import ClientesContext from '../context/customersProvider'

const useCustomers = () => {
    return useContext(ClientesContext)
}

export default useCustomers