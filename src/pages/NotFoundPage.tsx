import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const session = authService.getSession();

  const handleGoHome = () => {
    if (session) {
      navigate("/dashboard"); // inicio para usuario logueado
    } else {
      navigate("/"); // inicio público
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        La ruta que intentas acceder no existe.
      </p>

      <button
        onClick={handleGoHome}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFoundPage;
