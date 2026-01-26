import { useEffect, useState } from "react";
import { API } from "../api/api";
import Tabla from "./Tabla";
import { generarPDF } from "../utils/generarPDF";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({});
  const [seleccionados, setSeleccionados] = useState([]);

  const cargar = async () => {
    const r = await fetch(`${API}/clientes`);
    setClientes(await r.json());
  };

  const guardar = async () => {
    await fetch(`${API}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({});
    cargar();
  };

  const eliminar = async () => {
    if (!confirm("¿Eliminar registros seleccionados?")) return;
    for (let id of seleccionados) {
      await fetch(`${API}/clientes/${id}`, { method: "DELETE" });
    }
    setSeleccionados([]);
    cargar();
  };

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <h2>Clientes</h2>

      <input placeholder="Nombres" onChange={e => setForm({ ...form, nombres: e.target.value })}/>
      <input placeholder="Apellidos" onChange={e => setForm({ ...form, apellidos: e.target.value })}/>
      <input placeholder="Cédula" maxLength="10" onChange={e => setForm({ ...form, cedula: e.target.value.replace(/\D/g, "") })}/>
      <input placeholder="Teléfono" maxLength="10" onChange={e => setForm({ ...form, telefono: e.target.value.replace(/\D/g, "") })}/>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value.toLowerCase() })}/>
      <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })}/>

      <button onClick={guardar}>Agregar</button>

      <Tabla
        columnas={["nombres", "apellidos", "cedula", "telefono", "email"]}
        datos={clientes}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <button onClick={eliminar}>Eliminar</button>
      <button onClick={() =>
        generarPDF("Clientes", clientes.filter(c => seleccionados.includes(c._id)))
      }>
        Descargar PDF
      </button>
    </>
  );
}
