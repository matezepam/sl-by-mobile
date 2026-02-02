import { useState } from "react";
import Tabla from "./Tabla";

export default function Reportes() {
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const [reportes] = useState([
    { fecha: "2026-01-01", ventas: 15, total: "$1,200", cliente: "Juan Pérez" },
    { fecha: "2026-01-02", ventas: 8, total: "$750", cliente: "María López" },
    { fecha: "2026-01-03", ventas: 20, total: "$2,400", cliente: "Carlos Ramírez" },
    { fecha: "2026-01-04", ventas: 6, total: "$420", cliente: "Andrea Torres" },
    { fecha: "2026-01-05", ventas: 18, total: "$1,980", cliente: "Luis Mendoza" },
    { fecha: "2026-01-06", ventas: 10, total: "$860", cliente: "Sofía Andrade" },
    { fecha: "2026-01-07", ventas: 25, total: "$3,100", cliente: "Pedro Castillo" },
    { fecha: "2026-01-08", ventas: 4, total: "$310", cliente: "Diana Salazar" },
    { fecha: "2026-01-09", ventas: 12, total: "$1,050", cliente: "Miguel Flores" },
    { fecha: "2026-01-10", ventas: 30, total: "$4,200", cliente: "Fernanda Ruiz" },
    { fecha: "2026-01-11", ventas: 7, total: "$560", cliente: "José Paredes" },
    { fecha: "2026-01-12", ventas: 16, total: "$1,760", cliente: "Valeria Córdova" },
    { fecha: "2026-01-13", ventas: 9, total: "$810", cliente: "Ricardo Mora" },
    { fecha: "2026-01-14", ventas: 22, total: "$2,750", cliente: "Camila Herrera" },
    { fecha: "2026-01-15", ventas: 14, total: "$1,340", cliente: "Andrés Molina" },
    { fecha: "2026-01-16", ventas: 19, total: "$2,100", cliente: "Paola Vega" },
    { fecha: "2026-01-17", ventas: 5, total: "$390", cliente: "Esteban Navas" },
    { fecha: "2026-01-18", ventas: 27, total: "$3,680", cliente: "Natalia Ponce" },
    { fecha: "2026-01-19", ventas: 11, total: "$970", cliente: "Hugo Benítez" },
    { fecha: "2026-01-20", ventas: 21, total: "$2,620", cliente: "Daniela Peña" },
    { fecha: "2026-01-21", ventas: 13, total: "$1,180", cliente: "Iván Rosero" },
    { fecha: "2026-01-22", ventas: 17, total: "$1,950", cliente: "Karen Bustos" },
    { fecha: "2026-01-23", ventas: 24, total: "$3,200", cliente: "Sebastián Luna" },
    { fecha: "2026-01-24", ventas: 6, total: "$480", cliente: "Rocío Almeida" },
    { fecha: "2026-01-25", ventas: 29, total: "$4,050", cliente: "Jorge Acosta" },
    { fecha: "2026-01-26", ventas: 8, total: "$690", cliente: "Mónica Ríos" },
    { fecha: "2026-01-27", ventas: 20, total: "$2,500", cliente: "Cristian Viteri" },
    { fecha: "2026-01-28", ventas: 15, total: "$1,410", cliente: "Gabriela Núñez" },
    { fecha: "2026-01-29", ventas: 26, total: "$3,740", cliente: "Diego Zambrano" },
    { fecha: "2026-01-30", ventas: 9, total: "$820", cliente: "Lorena Espinoza" }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center">
        Reportes de Ventas
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setMostrarExplicacion(!mostrarExplicacion)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {mostrarExplicacion ? "Ocultar explicación" : "Ver explicación del reporte"}
        </button>
      </div>

      {mostrarExplicacion && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-8 text-slate-700 leading-relaxed">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">
            Explicación del problema y contexto del reporte
          </h3>
          <p className="mb-4">
            Este reporte de ventas surge de la necesidad de la empresa de llevar un
            control detallado, organizado y verificable de todas las transacciones
            realizadas durante un período determinado. El problema principal detectado
            era la falta de visibilidad sobre el rendimiento diario de ventas, lo que
            dificultaba la toma de decisiones estratégicas.
          </p>
          <p className="mb-4">
            Antes de implementar este sistema, la información se encontraba dispersa,
            con registros manuales, errores humanos frecuentes y una ausencia total de
            métricas consolidadas. Esto provocaba retrasos en los cierres contables,
            inconsistencias en los montos reportados y dificultades para identificar a
            los clientes con mayor volumen de compras.
          </p>
          <p className="mb-4">
            El objetivo de este módulo es centralizar los datos de ventas, permitir su
            visualización clara mediante tablas dinámicas y ofrecer una base sólida
            para futuras ampliaciones como gráficos estadísticos, exportación de datos
            y análisis predictivo.
          </p>
          <p>
            Los datos presentados en este reporte son simulados y cumplen la función
            de demostrar el funcionamiento del sistema, la estructura de los registros
            y la interacción del usuario con la información presentada.
          </p>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-2xl p-6 border border-slate-200">
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
