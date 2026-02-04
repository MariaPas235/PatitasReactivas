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

  return <AuthForm mode="login" onSubmit={handleLogin} />;
};

export default AuthPageLogin;
