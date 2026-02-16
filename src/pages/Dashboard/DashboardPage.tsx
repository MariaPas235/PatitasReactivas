import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { animalService } from "../../services/animalService";
import { AnimalCard } from "../../components/AnimalCard";
import Loading from "../../components/Loading";
import type { Animal } from "../../types/Animals";

const DashboardPage = () => {
  const session = authService.getSession();
  const navigate = useNavigate();

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    animalService
      .getUserAnimals(session.user.id)
      .then(setAnimals)
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [session]);

  if (!session) return <Navigate to="/" replace />;

  const handleDeleted = (id: string) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdated = (updated: Animal) => {
    setAnimals((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Mascotas de {session.user.name}</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: loading ? "center" : "flex-start",
          minHeight: "200px",
        }}
      >
        {loading ? (
          <Loading />
        ) : animals.length === 0 ? (
          <p>No tienes mascotas registradas.</p>
        ) : (
          animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onDeleted={handleDeleted}
              onUpdated={handleUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
