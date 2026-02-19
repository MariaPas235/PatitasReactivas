import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Button from "./Button";

const PrivateLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/", { replace: true });
  };

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

        <Button variant="danger" className="nav-logout" onClick={handleLogout}>
          Cerrar sesion
        </Button>
      </nav>

      <Outlet />
    </>
  );
};

export default PrivateLayout;
