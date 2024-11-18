import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

// ==== De esta forma le decimos que le enviaremos datos tipo JSON ====
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El origen del request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api", userRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
