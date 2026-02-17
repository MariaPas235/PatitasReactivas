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
      console.error("Error al iniciar sesion:", error);
    }
  };

  return (
    <div className="auth-page">
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p className="auth-switch">
        No tienes cuenta?{" "}
        <button className="text-button" onClick={() => navigate("/register")}>Registrate aqui</button>
      </p>
    </div>
  );
};

export default AuthPageLogin;
