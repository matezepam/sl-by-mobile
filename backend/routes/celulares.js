import express from "express";
import Celular from "../models/Celular.js";

const router = express.Router();

router.get("/", async (_, res) => {
  res.json(await Celular.find());
});

router.post("/", async (req, res) => {
  const celular = new Celular(req.body);
  await celular.save();
  res.json(celular);
});

router.delete("/:id", async (req, res) => {
  await Celular.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
