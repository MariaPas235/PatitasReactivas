import { NavLink, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <>
      <nav className="private-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}>
          Mascotas
        </NavLink>

        <NavLink to="/add" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}>
          Nuevo
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}>
          Perfil
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
};

export default PrivateLayout;
