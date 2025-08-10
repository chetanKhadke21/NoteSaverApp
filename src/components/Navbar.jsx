import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white px-8 py-4 shadow-sm flex justify-between items-center border-b border-gray-200">

      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <img src="/notebook.svg" alt="Notebook Logo" className="h-7" />
        <h1 className="text-lg font-semibold tracking-wide">Notebook</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "hover:bg-gray-500"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "hover:bg-gray-500"
            }`
          }
        >
          Create Note
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
