import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AddAnimalPage from "./pages/AddAnimal/AddAnimalPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AuthPageLogin from "./pages/Auth/AuthPageLogin";
import AuthPageRegistro from "./pages/Auth/AuthPageRegistro";
import IntroPage from "./pages/Intro/IntroPage";
import NotFoundPage from "./pages/NotFoundPage";
import { authService } from "./services/authService";
import PrivateLayout from "./components/PrivateLayout";
import { ToastProvider } from "./components/ToastProvider";

const App = () => {
  const initialSession = authService.getSession();
  const [session, setSession] = useState(initialSession);

  //Subscripción de servicios, si se cierra sesion en otra pestaña, este useEffect lo detecta y actualiza el estado de session, lo que hace que se redirija a login

  useEffect(() => {
    const unsub = authService.subscribe((nextSession) => {
      setSession(nextSession);
    });
    return unsub;
  }, []); // Se ejecuta una sola vez al montar el componente para suscribirse a los cambios de sesión

  useEffect(() => {
    if (!session) return;

    let cancelled = false;

    const checkSession = async () => {
      const valid = await authService.validateSession();
      if (cancelled) return;

      if (!valid) {
        authService.logout();
      }
    };

    void checkSession();// Validar sesión al montar el componente o cuando cambie la sesión cada 5 segundos para detectar si ha expirado o ha sido invalidada en otra pestaña
    const intervalId = window.setInterval(() => {
      void checkSession();
    }, 5000); 

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [session]); // Se ejecuta cada vez que cambia la sesión para validar su estado

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {!session && (
            <>
              <Route path="/" element={<IntroPage />} />
              <Route path="/login" element={<AuthPageLogin />} />
              <Route path="/register" element={<AuthPageRegistro />} />
              <Route path="/dashboard" element={<Navigate to="/login" replace />} />
              <Route path="/add" element={<Navigate to="/login" replace />} />
              <Route path="/profile" element={<Navigate to="/login" replace />} />
            </>
          )}
          {session && (
            <>
              <Route element={<PrivateLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/add" element={<AddAnimalPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
