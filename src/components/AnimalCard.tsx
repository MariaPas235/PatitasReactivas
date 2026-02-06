import type { Animal } from "../types/Animals";
import { animalService } from "../services/animalService";
import { useState } from "react";

type Props = {
  animal: Animal;
  onDeleted?: (id: string) => void; // callback para actualizar la lista
};

export const AnimalCard = ({ animal, onDeleted }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar ${animal.name}?`)) return;
    setLoading(true);
    try {
      await animalService.deleteAnimal(animal.id);
      onDeleted?.(animal.id); // actualiza la lista en el dashboard
    } catch (err) {
      console.error(err);
      alert("Error eliminando la mascota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={animal.imageUrl} alt={animal.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
      <h3>{animal.name}</h3>
      <p>{animal.species} - {animal.age} años</p>
      <p>{animal.vaccinated ? "Vacunado" : "No vacunado"}</p>
      {animal.description && <p>{animal.description}</p>}
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  );
};
