import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AddAnimalPage from "./pages/AddAnimal/AddAnimalPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AuthPageLogin from "./pages/Auth/AuthPageLogin";
import AuthPageRegistro from "./pages/Auth/AuthPageRegistro";
import IntroPage from "./pages/Intro/IntroPage";
import { authService } from "./services/authService";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateLayout from "./components/PrivateLayout";

const App = () => {
  const [session, setSession] = useState(authService.getSession());

  useEffect(() => {
    const unsub = authService.subscribe(setSession);
    return unsub;
  }, []);

  return (
    <Router>
      <Routes>

        {/* =================== */}
        {/* RUTAS PÚBLICAS */}
        {/* =================== */}
        {!session && (
          <>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<AuthPageLogin />} />
            <Route path="/register" element={<AuthPageRegistro />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}

        {/* =================== */}
        {/* RUTAS PRIVADAS */}
        {/* =================== */}
        {session && (
          <>
            {/* Layout privado con navbar */}
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/add" element={<AddAnimalPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* 404 fuera del layout */}
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}

      </Routes>
    </Router>
  );
};

export default App;
