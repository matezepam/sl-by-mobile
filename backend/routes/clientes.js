import express from "express";
import Cliente from "../models/Cliente.js";
import { validarCedula } from "../utils/validarCedula.js";
import { validarTelefono } from "../utils/validarTelefono.js";
import { validarEmail } from "../utils/validarEmail.js";

const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await Cliente.find());
});

router.post("/", async (req, res) => {
  const { cedula, telefono, email } = req.body;

  if (!validarCedula(cedula))
    return res.status(400).json({ error: "Cédula inválida" });

  if (!validarTelefono(telefono))
    return res.status(400).json({ error: "Teléfono inválido" });

  if (!validarEmail(email))
    return res.status(400).json({ error: "Email inválido" });

  const cliente = new Cliente(req.body);
  await cliente.save();
  res.json(cliente);
});

router.delete("/:id", async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
