import { useEffect, useState } from "react";
import { API } from "../api/api";
import Tabla from "./Tabla";
import { generarPDF } from "../utils/generarPDF";

const catalogo = {
  Apple: {
    "iPhone 11": 450,
    "iPhone 12": 550,
    "iPhone 13": 680,
    "iPhone 14": 820,
    "iPhone 14 Pro": 980,
    "iPhone 15": 1050,
    "iPhone 15 Pro Max": 1290
  },
  Samsung: {
    "Galaxy S21": 520,
    "Galaxy S22": 620,
    "Galaxy S23": 750,
    "Galaxy S23 Ultra": 1150,
    "Galaxy A34": 360,
    "Galaxy A54": 410
  },
  Xiaomi: {
    "Redmi Note 11": 260,
    "Redmi Note 12": 280,
    "Redmi Note 13 Pro": 340,
    "Xiaomi 12": 620,
    "Xiaomi 13 Pro": 760
  },
  Huawei: {
    "P30 Pro": 390,
    "P40": 430,
    "P50 Pro": 690,
    "Nova 9": 360,
    "Nova 11": 420
  },
  Motorola: {
    "Moto G60": 300,
    "Moto G73": 340,
    "Edge 30": 490,
    "Edge 40": 520
  },
  Oppo: {
    "Reno 8": 480,
    "Reno 10": 520,
    "Find X5": 720
  },
  Realme: {
    "Realme 10": 290,
    "Realme 11 Pro": 420,
    "GT Neo 3": 610
  },
  OnePlus: {
    "OnePlus 9": 620,
    "OnePlus 10 Pro": 780,
    "OnePlus 11": 890
  }
};

const generarCodigo = (marca, modelo) => {
  const m = marca.substring(0, 2).toUpperCase();
  const mod = modelo.replace(/\s+/g, "").substring(0, 5).toUpperCase();
  const rnd = Math.floor(100 + Math.random() * 900);
  return `${m}-${mod}-${rnd}`;
};

export default function Celulares() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    codigo: "",
    precio: ""
  });
  const [seleccionados, setSeleccionados] = useState([]);

  const cargar = async () => {
    const r = await fetch(`${API}/celulares`);
    setLista(await r.json());
  };

  const actualizarModelo = (marca, modelo) => {
    if (!catalogo[marca] || !catalogo[marca][modelo]) return;

    setForm({
      marca,
      modelo,
      precio: catalogo[marca][modelo],
      codigo: generarCodigo(marca, modelo)
    });
  };

  const guardar = async () => {
    await fetch(`${API}/celulares`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ marca: "", modelo: "", codigo: "", precio: "" });
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
    "w-full px-4 py-3 rounded-xl bg-red-50 border border-red-200 focus:ring-2 focus:ring-red-700";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Gestión de Celulares</h2>

      <div className="bg-white shadow-xl rounded-3xl p-8 mb-10">
        <h3 className="text-xl font-semibold mb-6">📱 Registro Profesional</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <select
            className={inputClass}
            value={form.marca}
            onChange={e =>
              setForm({ ...form, marca: e.target.value, modelo: "" })
            }
          >
            <option value="">Marca</option>
            {Object.keys(catalogo).map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <select
            className={inputClass}
            value={form.modelo}
            onChange={e => actualizarModelo(form.marca, e.target.value)}
          >
            <option value="">Modelo</option>
            {form.marca &&
              Object.keys(catalogo[form.marca]).map(mod => (
                <option key={mod}>{mod}</option>
              ))}
          </select>

          <input className={inputClass} value={form.codigo} readOnly />
          <input className={inputClass} value={form.precio} readOnly />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={guardar}
            className="px-8 py-3 bg-red-700 text-white rounded-xl hover:bg-red-800"
          >
            ➕ Guardar Celular
          </button>
        </div>
      </div>

      <Tabla
        columnas={["marca", "modelo", "codigo", "precio"]}
        datos={lista}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={eliminar}
          className="px-6 py-2 bg-red-700 text-white rounded-xl"
        >
          🗑️ Eliminar
        </button>

        <button
          onClick={() =>
            generarPDF(
              "Inventario de Celulares",
              lista.filter(c => seleccionados.includes(c._id))
            )
          }
          className="px-6 py-2 bg-slate-900 text-white rounded-xl"
        >
          📄 Exportar PDF
        </button>
      </div>
    </div>
  );
}
