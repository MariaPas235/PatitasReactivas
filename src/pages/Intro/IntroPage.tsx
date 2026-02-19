import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const IntroPage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="intro-page">
      <h1 className="page-title">Bienvenido a Patitas Reactivas</h1>
      <p className="intro-description">
        Aqui puedes gestionar las mascotas, anadir nuevas y mantener el seguimiento de los cuidados.
      </p>

      <div className="intro-actions">
        <Button onClick={() => navigate("/login")}>Iniciar sesion</Button> 
        <Button onClick={() => navigate("/register")}>Registrarse</Button>
      </div>
    </div>
  );
};

export default IntroPage;
