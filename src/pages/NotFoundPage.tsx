import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const session = authService.getSession();

  const handleGoHome = () => {
    if (session) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">La ruta que intentas acceder no existe.</p>
      <button onClick={handleGoHome}>Volver al inicio</button>
    </div>
  );
};

export default NotFoundPage;
