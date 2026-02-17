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
    <div className="auth-page">
      <AuthForm mode="register" onSubmit={handleRegister} />
      <p className="auth-switch">
        Ya tienes cuenta?{" "}
        <button className="text-button" onClick={() => navigate("/login")}>Inicia sesion aqui</button>
      </p>
    </div>
  );
};

export default AuthPageRegistro;
