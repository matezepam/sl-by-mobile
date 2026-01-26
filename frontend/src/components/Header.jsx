export default function Header({ setVista }) {
  return (
    <header style={{
      background: "#111827",
      padding: "15px",
      color: "white",
      display: "flex",
      gap: "15px"
    }}>
      <button onClick={() => setVista("clientes")}>CLIENTES</button>
      <button onClick={() => setVista("celulares")}>CELULARES</button>
    </header>
  );
}
