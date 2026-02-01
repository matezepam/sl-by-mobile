export default function Header({ setVista }) {
  return (
    <header className="bg-gradient-to-r from-rose-900 via-red-900 to-rose-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-inner">
              📊
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                Data Manager Mobile
              </h1>
              <p className="text-xs text-red-200">
                Sistema de Gestión de Datos
              </p>
            </div>
          </div>

          <nav className="flex gap-4 flex-wrap">
            <div className="relative group">
              <button
                onClick={() => setVista("clientes")}
                className="px-6 py-2 rounded-xl font-semibold text-white
                           bg-white/10 hover:bg-white/20
                           transition-all duration-200 hover:scale-105"
              >
                👥
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                              px-3 py-1 rounded-md bg-slate-900 text-white text-sm
                              opacity-0 pointer-events-none
                              transition-all duration-300 translate-y-2 group-hover:translate-y-0
                              group-hover:opacity-100 whitespace-nowrap">
                Clientes
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => setVista("celulares")}
                className="px-6 py-2 rounded-xl font-semibold text-white
                           bg-white/10 hover:bg-white/20
                           transition-all duration-200 hover:scale-105"
              >
                📱
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                              px-3 py-1 rounded-md bg-slate-900 text-white text-sm
                              opacity-0 pointer-events-none
                              transition-all duration-300 translate-y-2 group-hover:translate-y-0
                              group-hover:opacity-100 whitespace-nowrap">
                Celulares
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => setVista("ventas")}
                className="px-6 py-2 rounded-xl font-semibold text-white
                           bg-white/10 hover:bg-white/20
                           transition-all duration-200 hover:scale-105"
              >
                💰
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                              px-3 py-1 rounded-md bg-slate-900 text-white text-sm
                              opacity-0 pointer-events-none
                              transition-all duration-300 translate-y-2 group-hover:translate-y-0
                              group-hover:opacity-100 whitespace-nowrap">
                Ventas
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => setVista("reportes")}
                className="px-6 py-2 rounded-xl font-semibold text-white
                           bg-white/10 hover:bg-white/20
                           transition-all duration-200 hover:scale-105"
              >
                📄
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                              px-3 py-1 rounded-md bg-slate-900 text-white text-sm
                              opacity-0 pointer-events-none
                              transition-all duration-300 translate-y-2 group-hover:translate-y-0
                              group-hover:opacity-100 whitespace-nowrap">
                Reportes
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => setVista("configuracion")}
                className="px-6 py-2 rounded-xl font-semibold text-white
                           bg-white/10 hover:bg-white/20
                           transition-all duration-200 hover:scale-105"
              >
                ⚙️
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                              px-3 py-1 rounded-md bg-slate-900 text-white text-sm
                              opacity-0 pointer-events-none
                              transition-all duration-300 translate-y-2 group-hover:translate-y-0
                              group-hover:opacity-100 whitespace-nowrap">
                Configuración
              </div>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
}
