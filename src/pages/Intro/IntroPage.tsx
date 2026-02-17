import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-page">
      <h1 className="page-title">Bienvenido a Patitas Reactivas</h1>
      <p className="intro-description">
        Aqui puedes gestionar las mascotas, anadir nuevas y mantener el seguimiento de los cuidados.
      </p>

      <div className="intro-actions">
        <button onClick={() => navigate("/login")}>Iniciar sesion</button>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
};

export default IntroPage;
