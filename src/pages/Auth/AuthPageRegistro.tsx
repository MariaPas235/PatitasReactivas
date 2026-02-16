import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { authService } from "../../services/authService";
import type { User } from "../../types/Auth";

type RegisterPayload = Omit<User, "id" | "animals">;

const AuthPageRegistro = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterPayload) => {
    try {
      await authService.register(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <AuthForm mode="register" onSubmit={handleRegister} />
      <p>¿Ya tienes cuenta? <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>Inicia sesión aquí</button></p>
    </div>
  );
};

export default AuthPageRegistro;
