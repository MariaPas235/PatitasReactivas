import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Button from "../components/Button";

const NotFoundPage = () => {
  const navigate = useNavigate(); 
 
  const handleGoBack = () => {
    const session = authService.getSession();
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
      <Button onClick={handleGoBack}>Volver</Button>
    </div>
  );
};

export default NotFoundPage;
