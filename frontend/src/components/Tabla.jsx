export default function Tabla({ columnas, datos, seleccionados, setSeleccionados }) {

  const toggle = id => {
    setSeleccionados(
      seleccionados.includes(id)
        ? seleccionados.filter(x => x !== id)
        : [...seleccionados, id]
    );
  };

  return (
    <table style={{ width: "100%", marginTop: 20 }} border="1">
      <thead>
        <tr>
          <th></th>
          {columnas.map(c => <th key={c}>{c.toUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>
        {datos.map(d => (
          <tr key={d._id}>
            <td>
              <input
                type="checkbox"
                checked={seleccionados.includes(d._id)}
                onChange={() => toggle(d._id)}
              />
            </td>
            {columnas.map(c => <td key={c}>{d[c]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
