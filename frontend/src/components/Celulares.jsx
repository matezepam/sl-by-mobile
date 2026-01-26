import { useEffect, useState } from "react";
import { API } from "../api/api";
import Tabla from "./Tabla";
import { generarPDF } from "../utils/generarPDF";

export default function Celulares() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({});
  const [seleccionados, setSeleccionados] = useState([]);

  const cargar = async () => {
    const r = await fetch(`${API}/celulares`);
    setLista(await r.json());
  };

  const guardar = async () => {
    await fetch(`${API}/celulares`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    cargar();
  };

  const eliminar = async () => {
    if (!confirm("¿Eliminar celulares seleccionados?")) return;
    for (let id of seleccionados) {
      await fetch(`${API}/celulares/${id}`, { method: "DELETE" });
    }
    setSeleccionados([]);
    cargar();
  };

  useEffect(() => { cargar(); }, []);

  return (
    <>
      <h2>Celulares</h2>

      <input placeholder="Marca" onChange={e => setForm({ ...form, marca: e.target.value })}/>
      <input placeholder="Modelo" onChange={e => setForm({ ...form, modelo: e.target.value })}/>
      <input type="number" placeholder="Precio" onChange={e => setForm({ ...form, precio: e.target.value })}/>

      <button onClick={guardar}>Agregar</button>

      <Tabla
        columnas={["marca", "modelo", "precio"]}
        datos={lista}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <button onClick={eliminar}>Eliminar</button>
      <button onClick={() =>
        generarPDF("Celulares", lista.filter(c => seleccionados.includes(c._id)))
      }>
        Descargar PDF
      </button>
    </>
  );
}
