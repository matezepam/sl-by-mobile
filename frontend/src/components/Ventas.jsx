import { useEffect, useState } from "react";
import { API } from "../api/api";
import Tabla from "./Tabla";
import { generarPDF } from "../utils/generarPDF";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [celulares, setCelulares] = useState([]);
  const [form, setForm] = useState({});
  const [seleccionados, setSeleccionados] = useState([]);

  const cargarVentas = async () => {
    const r = await fetch(`${API}/ventas`);
    setVentas(await r.json());
  };

  const cargarClientes = async () => {
    const r = await fetch(`${API}/clientes`);
    setClientes(await r.json());
  };

  const cargarCelulares = async () => {
    const r = await fetch(`${API}/celulares`);
    setCelulares(await r.json());
  };

  const guardar = async () => {
    await fetch(`${API}/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({});
    cargarVentas();
  };

  const eliminar = async () => {
    if (!confirm("¿Eliminar ventas seleccionadas?")) return;
    for (let id of seleccionados) {
      await fetch(`${API}/ventas/${id}`, { method: "DELETE" });
    }
    setSeleccionados([]);
    cargarVentas();
  };

  useEffect(() => {
    cargarVentas();
    cargarClientes();
    cargarCelulares();
  }, []);

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-rose-600 focus:bg-white transition";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        Gestión de Ventas
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">
          Nueva Venta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className={inputClass}
            value={form.cliente || ""}
            onChange={e => setForm({ ...form, cliente: e.target.value })}
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map(c => (
              <option key={c._id} value={c._id}>
                {c.nombres} {c.apellidos}
              </option>
            ))}
          </select>

          <select
            className={inputClass}
            value={form.celular || ""}
            onChange={e => setForm({ ...form, celular: e.target.value })}
          >
            <option value="">Seleccionar Celular</option>
            {celulares.map(c => (
              <option key={c._id} value={c._id}>
                {c.marca} {c.modelo}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio"
            className={inputClass}
            value={form.precio || ""}
            onChange={e => setForm({ ...form, precio: e.target.value })}
          />

          <input
            type="date"
            placeholder="Fecha"
            className={inputClass}
            value={form.fecha || ""}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
          />

          <select
            className={inputClass}
            value={form.metodo || ""}
            onChange={e => setForm({ ...form, metodo: e.target.value })}
          >
            <option value="">Método de Pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={guardar}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 text-white font-semibold hover:from-rose-800 hover:to-red-800 transition-all shadow-md"
          >
            ➕ Agregar Venta
          </button>
        </div>
      </div>

      <Tabla
        columnas={["cliente", "celular", "precio", "fecha", "metodo"]}
        datos={ventas.map(v => ({
          ...v,
          cliente: clientes.find(c => c._id === v.cliente)
            ? clientes.find(c => c._id === v.cliente).nombres +
              " " +
              clientes.find(c => c._id === v.cliente).apellidos
            : "Desconocido",
          celular: celulares.find(c => c._id === v.celular)
            ? celulares.find(c => c._id === v.celular).marca +
              " " +
              celulares.find(c => c._id === v.celular).modelo
            : "Desconocido"
        }))}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <div className="flex flex-wrap gap-4 justify-end mt-6">
        <button
          onClick={eliminar}
          className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow"
        >
          🗑️ Eliminar
        </button>

        <button
          onClick={() =>
            generarPDF(
              "Ventas",
              ventas.filter(v => seleccionados.includes(v._id))
            )
          }
          className="px-5 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition shadow"
        >
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
}
