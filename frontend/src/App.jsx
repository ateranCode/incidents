import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import ProtectedRoute from './layout/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import NewKey from './pages/NewKey'
import Dashboard from './pages/Private/Dashboard'

import { AuthProvider } from './context/AuthProvider'
import { ClientesProvider } from './context/customersProvider'
import ManageIncidents from './pages/Private/ManageIncidents'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientesProvider>
          <Routes>
            {/*Public */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Register />} />
              <Route path='olvide-clave' element={<ForgetPassword />} />
              <Route path='olvide-clave/:token' element={<NewKey />} />
              <Route path='confirmar/:id' element={<ConfirmAccount />} />
            </Route>

            {/*Private */}
            <Route path='/admin' element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path='incidencias' element={<ManageIncidents />} />
            </Route>

          </Routes>
        </ClientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
