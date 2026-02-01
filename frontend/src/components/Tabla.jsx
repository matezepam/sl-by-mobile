export default function Tabla({ columnas, datos, seleccionados, setSeleccionados }) {
  const toggle = id => {
    setSeleccionados(
      seleccionados.includes(id)
        ? seleccionados.filter(x => x !== id)
        : [...seleccionados, id]
    );
  };

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl shadow-xl border border-red-900/30 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gradient-to-r from-red-900 to-red-700 text-white">
          <tr>
            <th className="px-4 py-4 text-center"></th>
            {columnas.map(c => (
              <th
                key={c}
                className="px-4 py-4 text-center font-semibold uppercase tracking-wide"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {datos.map((d, i) => (
            <tr
              key={d._id}
              className={`transition-all
                ${i % 2 === 0 ? "bg-white" : "bg-red-50"}
                hover:bg-red-100`}
            >
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(d._id)}
                  onChange={() => toggle(d._id)}
                  className="w-4 h-4 accent-red-700 cursor-pointer"
                />
              </td>

              {columnas.map(c => (
                <td
                  key={c}
                  className="px-4 py-3 text-center text-slate-800 font-medium"
                >
                  {d[c] || "-"}
                </td>
              ))}
            </tr>
          ))}

          {datos.length === 0 && (
            <tr>
              <td
                colSpan={columnas.length + 1}
                className="py-10 text-center text-slate-500 font-semibold"
              >
                No hay registros para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
