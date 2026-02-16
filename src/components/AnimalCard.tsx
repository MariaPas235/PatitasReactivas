import type { Animal } from "../types/Animals";
import { animalService } from "../services/animalService";
import { useState } from "react";
import { AnimalForm } from "./AnimalForm";
import Modal from "./Modal";

type Props = {
  animal: Animal;
  onDeleted?: (id: string) => void; // callback para actualizar la lista
  onUpdated?: (animal: Animal) => void; // callback para notificar edición
};

export const AnimalCard = ({ animal, onDeleted, onUpdated }: Props) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

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

  const handleUpdate = async (data: Omit<Animal, "id">) => {
    setUpdating(true);
    try {
      const updated = await animalService.updateAnimal(animal.id, data);
      // notificar al padre
      onUpdated?.(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error actualizando la mascota");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={animal.imageUrl} alt={animal.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
      <h3>{animal.name}</h3>
      <p>{animal.species} - {animal.age} años</p>
      <p>{animal.vaccinated ? "Vacunado" : "No vacunado"}</p>
      {animal.description && <p>{animal.description}</p>}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button onClick={() => setEditing((s) => !s)} disabled={updating}>{editing ? "Cerrar" : "Editar"}</button>
        <button onClick={handleDelete} disabled={loading}>{loading ? "Eliminando..." : "Eliminar"}</button>
      </div>

      {editing && (
        <Modal onClose={() => setEditing(false)}>
          <h2>Editar {animal.name}</h2>
          <AnimalForm
            initial={{ name: animal.name, species: animal.species, age: animal.age, vaccinated: animal.vaccinated, description: animal.description, imageUrl: animal.imageUrl }}
            onCancel={() => setEditing(false)}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
};
