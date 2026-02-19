import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import Button from "../../components/Button";
import { useToast } from "../../components/ToastProvider";
import { authService } from "../../services/authService";
import type { User } from "../../types/Auth";

type RegisterPayload = Omit<User, "id" | "animals">;

const AuthPageRegistro = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = async (data: RegisterPayload) => {
    try {
      await authService.register(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "El email ya se encuentra registrado en la base de datos";
      showToast({ message, type: "error" });
    }
  };

  return (
    <div className="auth-page">
      <AuthForm mode="register" onSubmit={handleRegister} />
      <p className="auth-switch">
        ¿Ya tienes cuenta?{" "}
        <Button variant="text" onClick={() => navigate("/login")}>
          Inicia sesion aqui
        </Button>
      </p>
    </div>
  );
};

export default AuthPageRegistro;
