export default function Header({ setVista }) {
  return (
    <header className="bg-slate-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center md:justify-start">
        <button
          onClick={() => setVista("clientes")}
          className="px-5 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-blue-600 transition"
        >
          Clientes
        </button>

        <button
          onClick={() => setVista("celulares")}
          className="px-5 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-blue-600 transition"
        >
          Celulares
        </button>
      </div>
    </header>
  );
}
