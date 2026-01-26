import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
  nombres: { type: String, required: true, uppercase: true },
  apellidos: { type: String, required: true, uppercase: true },
  cedula: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true }
});

export default mongoose.model("Cliente", ClienteSchema);
