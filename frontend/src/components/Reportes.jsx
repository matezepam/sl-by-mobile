import { useState } from "react";
import Tabla from "./Tabla";

export default function Reportes() {
  const [reportes] = useState([
    {
      fecha: "2026-01-01",
      ventas: 15,
      total: "$1,200",
      cliente: "Juan Pérez",
    },
    {
      fecha: "2026-01-02",
      ventas: 8,
      total: "$750",
      cliente: "María López",
    },
    {
      fecha: "2026-01-03",
      ventas: 20,
      total: "$2,400",
      cliente: "Carlos Ramírez",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        Reportes de Ventas
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-200">
        <p className="text-slate-700 mb-4">
          Esta tabla muestra un ejemplo de los reportes de ventas generados automáticamente.
        </p>

        <Tabla
          columnas={["fecha", "ventas", "total", "cliente"]}
          datos={reportes}
          seleccionados={[]}
          setSeleccionados={() => {}}
        />
      </div>
    </div>
  );
}
