import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/customers", config);
        setClientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientes();
  }, []);

  const guardarCliente = async (cliente) => {
    if (cliente.id) {
      console.log("editando...");
    } else {
      console.log("nuevo");
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post("/customers", cliente, config);

      const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data;

      setClientes([clienteAlmacenado, ...clientes]);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const setEdicion = (cliente) => {
    setCliente(cliente);
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        guardarCliente,
        setEdicion,
        cliente,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export default ClientesContext;
