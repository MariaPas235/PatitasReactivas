import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { animalService } from "../../services/animalService";
import { AnimalCard } from "../../components/AnimalCard";
import type { Animal } from "../../types/Animals";

const DashboardPage = () => {
  const session = authService.getSession();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    if (!session) return;
    animalService.getUserAnimals(session.user.id).then(setAnimals).catch(console.error);
  }, [session]);

  if (!session) return <Navigate to="/login" replace />;

  const handleDeleted = (id: string) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mascotas de {session.user.name}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
