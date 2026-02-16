import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { authService } from "../../services/authService";

const AuthPageLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await authService.login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p>¿No tienes cuenta? <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>Regístrate aquí</button></p>
    </div>
  );
};

export default AuthPageLogin;
