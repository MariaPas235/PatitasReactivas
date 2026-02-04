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

  return <AuthForm mode="register" onSubmit={handleRegister} />;
};

export default AuthPageRegistro;
