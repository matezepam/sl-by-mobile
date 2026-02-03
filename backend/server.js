import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import clientesRoutes from "./routes/clientes.js";
import celularesRoutes from "./routes/celulares.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/compra_venta")
  .then(() => console.log("✔ MONGODB CONECTADO"))
  .catch(err => console.error(err));

app.use("/api/clientes", clientesRoutes);
app.use("/api/celulares", celularesRoutes);

app.listen(3001, () => {
  console.log("🚀 Backend en http://localhost:3001");
});
