import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "1rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Bienvenido a Patitas Reactivas</h1>
      <p style={{ maxWidth: 600, textAlign: "center", marginBottom: "1.5rem" }}>
        Aquí puedes gestionar las mascotas, añadir nuevas y mantener el seguimiento de los cuidados.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => navigate("/login")} style={{ padding: "0.6rem 1rem" }}>
          Iniciar sesión
        </button>
        <button onClick={() => navigate("/register")} style={{ padding: "0.6rem 1rem" }}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
