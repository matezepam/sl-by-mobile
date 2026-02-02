import { useEffect, useState } from "react";
import { API } from "../api/api";
import Tabla from "./Tabla";
import { generarPDF } from "../utils/generarPDF";

const MODELOS = {
  Samsung: [
    "Galaxy S24 Ultra","Galaxy S24+","Galaxy S24",
    "Galaxy S23 Ultra","Galaxy S23+","Galaxy S23","Galaxy S23 FE",
    "Galaxy S22 Ultra","Galaxy S22+","Galaxy S22",
    "Galaxy Z Fold5","Galaxy Z Fold4","Galaxy Z Flip5","Galaxy Z Flip4",
    "Galaxy A74","Galaxy A73","Galaxy A72","Galaxy A71","Galaxy A70",
    "Galaxy A55","Galaxy A54","Galaxy A53","Galaxy A52","Galaxy A51","Galaxy A50",
    "Galaxy A35","Galaxy A34","Galaxy A33","Galaxy A32","Galaxy A31","Galaxy A30",
    "Galaxy M54","Galaxy M53","Galaxy M52","Galaxy M51","Galaxy M50",
    "Galaxy Note 20 Ultra","Galaxy Note 20","Galaxy Note 10+","Galaxy Note 10"
  ],
  iPhone: [
    "iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15 Plus","iPhone 15",
    "iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14 Plus","iPhone 14",
    "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13","iPhone 13 Mini",
    "iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12","iPhone 12 Mini",
    "iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11",
    "iPhone XS Max","iPhone XS","iPhone XR",
    "iPhone X","iPhone 8 Plus","iPhone 8","iPhone 7 Plus","iPhone 7",
    "iPhone SE 2022","iPhone SE 2020"
  ],
  Xiaomi: [
    "Xiaomi 14 Ultra","Xiaomi 14 Pro","Xiaomi 14",
    "Xiaomi 13 Ultra","Xiaomi 13 Pro","Xiaomi 13","Xiaomi 13 Lite",
    "Xiaomi 12 Pro","Xiaomi 12","Xiaomi 12 Lite",
    "Redmi Note 13 Pro+","Redmi Note 13 Pro","Redmi Note 13",
    "Redmi Note 12 Pro+","Redmi Note 12 Pro","Redmi Note 12",
    "Redmi Note 11 Pro","Redmi Note 11","Redmi Note 10 Pro","Redmi Note 10",
    "Redmi 13","Redmi 12","Redmi 11","Redmi 10","Redmi 9",
    "POCO F5 Pro","POCO F5","POCO F4","POCO X6 Pro","POCO X6","POCO X5 Pro","POCO X5"
  ]
};

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [form, setForm] = useState({
    codigo: "",
    cliente: "",
    precio: "",
    fecha: "",
    metodo: ""
  });

  const cargarVentas = async () => {
    const r = await fetch(`${API}/ventas`);
    setVentas(await r.json());
  };

  const cargarClientes = async () => {
    const r = await fetch(`${API}/clientes`);
    setClientes(await r.json());
  };

  useEffect(() => {
    cargarVentas();
    cargarClientes();
  }, []);

  useEffect(() => {
    setForm(f => ({
      ...f,
      codigo: `V-${Date.now().toString().slice(-6)}`
    }));
  }, [marca, modelo]);

  const guardar = async () => {
    if (!marca || !modelo || !form.cliente) return;
    await fetch(`${API}/ventas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        marca,
        modelo
      })
    });
    setMarca("");
    setModelo("");
    setForm({
      codigo: "",
      cliente: "",
      precio: "",
      fecha: "",
      metodo: ""
    });
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

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">
        Gestión de Ventas
      </h2>

      <div className="bg-white shadow-2xl rounded-2xl p-6 mb-10 border">
        <h3 className="text-xl font-semibold mb-5">Nueva Venta</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className={inputClass} value={form.codigo} disabled />

          <select
            className={inputClass}
            value={form.cliente}
            onChange={e => setForm({ ...form, cliente: e.target.value })}
          >
            <option value="">Cliente</option>
            {clientes.map(c => (
              <option key={c._id} value={c._id}>
                {c.nombres} {c.apellidos}
              </option>
            ))}
          </select>

          <select
            className={inputClass}
            value={marca}
            onChange={e => {
              setMarca(e.target.value);
              setModelo("");
            }}
          >
            <option value="">Marca</option>
            <option value="Samsung">Samsung</option>
            <option value="iPhone">iPhone</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>

          <select
            className={inputClass}
            value={modelo}
            disabled={!marca}
            onChange={e => setModelo(e.target.value)}
          >
            <option value="">Modelo</option>
            {marca &&
              MODELOS[marca].map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Precio"
            className={inputClass}
            value={form.precio}
            onChange={e => setForm({ ...form, precio: e.target.value })}
          />

          <input
            type="date"
            className={inputClass}
            value={form.fecha}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
          />

          <select
            className={inputClass}
            value={form.metodo}
            onChange={e => setForm({ ...form, metodo: e.target.value })}
          >
            <option value="">Método de Pago</option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={guardar}
            className="px-7 py-3 rounded-xl bg-indigo-700 text-white font-bold hover:bg-indigo-800 transition"
          >
            ➕ Registrar Venta
          </button>
        </div>
      </div>

      <Tabla
        columnas={["codigo", "cliente", "marca", "modelo", "precio", "fecha", "metodo"]}
        datos={ventas.map(v => ({
          ...v,
          cliente:
            clientes.find(c => c._id === v.cliente)?.nombres +
              " " +
              clientes.find(c => c._id === v.cliente)?.apellidos || "—"
        }))}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={eliminar}
          className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
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
          className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"
        >
          📄 Descargar PDF
        </button>
      </div>
    </div>
  );
}
