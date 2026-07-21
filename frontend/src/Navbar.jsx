import { NavLink } from "react-router-dom";

const linkBase =
  "px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Marca */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </span>
          <span className="font-extrabold tracking-tight text-slate-900 dark:text-white">
            Monitor FDM
          </span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/deep-learning"
            className={({ isActive }) =>
              isActive
                ? `${linkBase} text-white bg-indigo-600 shadow-md shadow-indigo-500/30`
                : `${linkBase} text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/30`
            }
          >
            Testar IA
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
