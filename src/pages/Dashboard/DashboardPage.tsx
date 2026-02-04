import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import type { Animal } from "../../types/Animals";
import AddAnimalButton from "../../components/AddAnimalButton";
import AnimalCard from "../../components/AnimalCard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const session = authService.getSession();

  // Hook siempre llamado en el mismo orden
  const [animals, setAnimals] = useState<Animal[]>(session?.user.animals || []);

  // Redirige si no hay sesión
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [navigate, session]);

  const handleAddAnimal = (animal: Animal) => {
    setAnimals((prev) => [...prev, animal]);
  };

  return session ? (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <AddAnimalButton onAdd={handleAddAnimal} />

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  ) : null;
};

export default DashboardPage;
