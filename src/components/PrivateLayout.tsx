import { NavLink, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <>
      <nav
        style={{
          padding: "1rem",
          backgroundColor: "#eee",
          display: "flex",
          gap: "1rem",
        }}
      >
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Mascotas
        </NavLink>

        <NavLink
          to="/add"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Nuevo
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Perfil
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
};

export default PrivateLayout;
