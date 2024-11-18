import { useState, useEffect } from "react";
import Alerta from "./Alert";
import useCustomers from "../hooks/useCustomers";

const Form = () => {
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarCliente, cliente } = useCustomers();

  useEffect(() => {
    if (cliente?.name) {
      setName(cliente.name);
      setIdentity(cliente.identity);
      setDetails(cliente.details);
      setDate(new Date(cliente.date).toISOString());
      setId(cliente._id);
    }
  }, [cliente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([name, identity, details, date].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({ msg: "Incidencia agregada" });

    guardarCliente({ name, identity, details, date, id });
  };

  const { msg } = alerta;
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 mb-10 md:mb-0 rounded"
        action="#"
      >
        <p className="font-semibold text-md text-center mb-3">
          Añade tus <span className="text-sky-900 font-bold">Incidencias</span>
        </p>
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-2">
          <label className="text-gray-700 text-sm" htmlFor="name">
            Cliente
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del cliente"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-sm text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-700 text-sm" htmlFor="identity">
            Naturaleza
          </label>
          <input
            id="identity"
            type="text"
            placeholder="Cédula / Código de grupo"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-sm text-sm"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-700 text-sm" htmlFor="details">
            Detalles
          </label>
          <textarea
            id="details"
            rows={2}
            placeholder="Detalles de la incidencia"
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-sm text-sm"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="text-gray-700 text-sm" htmlFor="details">
            Fecha
          </label>
          <input
            id="details"
            type="date"
            rows={2}
            className="border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-sm text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <input
          value={id ? "Guardar cambios" : "Agregar incidencia"}
          type="submit"
          className="bg-sky-900 w-full p-2 text-white uppercase font-bold text-sm mt-5 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Form;
