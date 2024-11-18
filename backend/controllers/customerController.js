import Customer from "../models/Customer.js";

const agregarClientes = async (req, res) => {
  const cliente = new Customer(req.body);
  cliente.user = req.user._id;
  try {
    const clienteGuardado = await cliente.save();
    res.json(clienteGuardado);
  } catch (error) {
    console.log(error);
  }
};
const obtenerClientes = async (req, res) => {
  const clientes = await Customer.find().where("user").equals(req.user);

  res.json(clientes);
};

const obtenerCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await Customer.findById(id);

  if (!cliente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (cliente.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  res.json(cliente);
};

const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await Customer.findById(id);

  if (!cliente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (cliente.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  if (cliente) {
    // Actualizar cliente
    cliente.name = req.body.name || cliente.name;
    cliente.identity = req.body.identity || cliente.identity;
    cliente.details = req.body.details || cliente.details;
    cliente.name = req.body.name || cliente.name;
    try {
      const clienteActualizado = await cliente.save();
      res.json(clienteActualizado);
    } catch (error) {
      console.log(error);
    }
  }
};

const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await Customer.findById(id);

  if (!cliente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (cliente.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "Acción no válida" });
  }

  try {
    await cliente.deleteOne();
    res.json({ msg: "Cliente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarClientes,
  obtenerClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente,
};
