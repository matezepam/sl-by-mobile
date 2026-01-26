import mongoose from "mongoose";

const CelularSchema = new mongoose.Schema({
  marca: { type: String, required: true, uppercase: true },
  modelo: { type: String, required: true, uppercase: true },
  precio: { type: Number, required: true }
});

export default mongoose.model("Celular", CelularSchema);
