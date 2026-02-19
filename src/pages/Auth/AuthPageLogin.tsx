import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import Button from "../../components/Button";
import { useToast } from "../../components/ToastProvider";
import { authService } from "../../services/authService";

const AuthPageLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await authService.login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Credenciales no validas";
      showToast({ message, type: "error" });
    }
  };

  return (
    <div className="auth-page">
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p className="auth-switch">
        ¿No tienes cuenta?{" "}
        <Button variant="text" onClick={() => navigate("/register")}>
          Registrate aqui
        </Button>
      </p>
    </div>
  );
};

export default AuthPageLogin;
