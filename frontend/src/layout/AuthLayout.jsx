import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const AuthLayout = () => {
    return (
        <>
            <Header />
            <main className='container mx-auto text-center mt-16'>
                <Outlet />
            </main>
        </>
    )
};

export default AuthLayout