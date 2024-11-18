import express from "express";
const router = express.Router();
import {
  agregarClientes,
  obtenerClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/customerController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(checkAuth, agregarClientes)
  .get(checkAuth, obtenerClientes);

router
  .route("/:id")
  .get(checkAuth, obtenerCliente)
  .put(checkAuth, actualizarCliente)
  .delete(checkAuth, eliminarCliente);

export default router;
