import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPageRegistro from "./pages/Auth/AuthPageRegistro";
import AuthPageLogin from "./pages/Auth/AuthPageLogin";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<AuthPageRegistro />} />
        <Route path="/login" element={<AuthPageLogin />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
