import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { animalService } from "../../services/animalService";
import { AnimalCard } from "../../components/AnimalCard";
import Loading from "../../components/Loading";
import type { Animal } from "../../types/Animals";

const DashboardPage = () => {
  const session = authService.getSession();

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
    setAnimals((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  return (
    <div className="content-page">
      <div className="dashboard-header">
        <h1>Mascotas de {session.user.name}</h1>

      </div>

      <div className={`dashboard-grid ${loading ? "is-loading" : ""}`.trim()}>
        {loading ? (
          <Loading />
        ) : animals.length === 0 ? (
          <p className="empty-state">No tienes mascotas registradas.</p>
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
