import { useState } from "react";
import Incidents from "../../components/Incidents";
import Form from "../../components/Form";

const ManageIncidents = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  return (
    <div className="flex flex-col md:flex-row px-5 gap-8">
      <button
        type="button"
        className="text-cyan-950 font-bold text-sm bg-slate-300 p-3 mx-10 rounded mb-10 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Ocultar formulario" : "Mostrar formulario"}
      </button>
      <div
        className={` ${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-96 `}
      >
        <Form />
      </div>
      <div className="w-screen">
        <Incidents />
      </div>
    </div>
  );
};

export default ManageIncidents;
