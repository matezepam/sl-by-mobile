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
    setForm({});
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

  useEffect(() => {
    cargar();
  }, []);

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 focus:bg-white transition-all";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Gestión de Celulares
      </h2>

      <div className="bg-gradient-to-br from-white to-red-50 shadow-2xl rounded-3xl p-8 mb-10 border border-red-200">
        <h3 className="text-xl font-semibold mb-6 text-red-800 flex items-center gap-2">
          📱 Registro de Celular
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            placeholder="Marca"
            className={inputClass}
            onChange={e => setForm({ ...form, marca: e.target.value })}
          />
          <input
            placeholder="Modelo"
            className={inputClass}
            onChange={e => setForm({ ...form, modelo: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            className={inputClass}
            onChange={e => setForm({ ...form, precio: e.target.value })}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={guardar}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-red-800 to-rose-700 text-white font-semibold hover:from-red-900 hover:to-rose-800 transition-all shadow-lg hover:scale-105"
          >
            ➕ Guardar Celular
          </button>
        </div>
      </div>

      <Tabla
        columnas={["marca", "modelo", "precio"]}
        datos={lista}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <div className="flex flex-wrap gap-4 justify-end mt-8">
        <button
          onClick={eliminar}
          className="px-6 py-2.5 rounded-xl bg-red-700 text-white font-semibold hover:bg-red-800 transition shadow"
        >
          🗑️ Eliminar
        </button>

        <button
          onClick={() =>
            generarPDF(
              "Celulares",
              lista.filter(c => seleccionados.includes(c._id))
            )
          }
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition shadow"
        >
          📄 Exportar PDF
        </button>
      </div>
    </div>
  );
}
