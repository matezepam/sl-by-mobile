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

  useEffect(() => {
    cargar();
  }, []);

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 focus:bg-white transition-all";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Gestión de Clientes
      </h2>

      <div className="bg-gradient-to-br from-white to-red-50 shadow-2xl rounded-3xl p-8 mb-10 border border-red-200">
        <h3 className="text-xl font-semibold mb-6 text-red-800 flex items-center gap-2">
          👤 Registro de Cliente
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            placeholder="Nombres"
            className={inputClass}
            onChange={e => setForm({ ...form, nombres: e.target.value })}
          />
          <input
            placeholder="Apellidos"
            className={inputClass}
            onChange={e => setForm({ ...form, apellidos: e.target.value })}
          />
          <input
            placeholder="Cédula"
            maxLength="10"
            className={inputClass}
            onChange={e =>
              setForm({ ...form, cedula: e.target.value.replace(/\D/g, "") })
            }
          />
          <input
            placeholder="Teléfono"
            maxLength="10"
            className={inputClass}
            onChange={e =>
              setForm({ ...form, telefono: e.target.value.replace(/\D/g, "") })
            }
          />
          <input
            placeholder="Email"
            className={inputClass}
            onChange={e =>
              setForm({ ...form, email: e.target.value.toLowerCase() })
            }
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={inputClass}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={guardar}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-red-800 to-rose-700 text-white font-semibold hover:from-red-900 hover:to-rose-800 transition-all shadow-lg hover:scale-105"
          >
            ➕ Guardar Cliente
          </button>
        </div>
      </div>

      <Tabla
        columnas={["nombres", "apellidos", "cedula", "telefono", "email"]}
        datos={clientes}
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
              "Clientes",
              clientes.filter(c => seleccionados.includes(c._id))
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
