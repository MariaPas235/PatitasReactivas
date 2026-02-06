import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AddAnimalPage from "./pages/AddAnimal/AddAnimalPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AuthPageLogin from "./pages/Auth/AuthPageLogin";
import AuthPageRegistro from "./pages/Auth/AuthPageRegistro";
import { authService } from "./services/authService";

const App = () => {
  const session = authService.getSession();

  if (!session) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPageLogin />} />
          <Route path="/register" element={<AuthPageRegistro />} />
          <Route path="*" element={<AuthPageLogin />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee", display: "flex", gap: "1rem" }}>
        <NavLink to="/dashboard" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>Mascotas</NavLink>
        <NavLink to="/add" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>Nuevo</NavLink>
        <NavLink to="/profile" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>Perfil</NavLink>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add" element={<AddAnimalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
