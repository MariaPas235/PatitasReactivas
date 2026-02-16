import type { Animal } from "../types/Animals";
import { animalService } from "../services/animalService";
import { useState } from "react";
import { AnimalForm } from "./AnimalForm";
import Modal from "./Modal";

type Props = {
  animal: Animal;
  onDeleted?: (id: string) => void;
  onUpdated?: (animal: Animal) => void;
};

export const AnimalCard = ({ animal, onDeleted, onUpdated }: Props) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar ${animal.name}?`)) return;
    setLoading(true);
    try {
      await animalService.deleteAnimal(animal.id);
      onDeleted?.(animal.id);
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
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={animal.imageUrl}
        alt={animal.name}
        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: 8 }}
      />
      <h3 style={{ margin: "0.5rem 0" }}>{animal.name}</h3>

      {/* Botones */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button onClick={() => setEditing(true)} disabled={updating}>
          {editing ? "Cerrar" : "Editar"}
        </button>
        <button onClick={handleDelete} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={() => setShowDetails(true)}>Ver detalles</button>
      </div>

      {/* Modal para editar */}
      {editing && (
        <Modal onClose={() => setEditing(false)}>
          <h2>Editar {animal.name}</h2>
          <AnimalForm
            initial={{
              name: animal.name,
              species: animal.species,
              age: animal.age,
              vaccinated: animal.vaccinated,
              description: animal.description,
              imageUrl: animal.imageUrl,
            }}
            onCancel={() => setEditing(false)}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}

      {/* Modal para ver detalles */}
      {showDetails && (
        <Modal onClose={() => setShowDetails(false)}>
          <h2>{animal.name}</h2>
          <img
            src={animal.imageUrl}
            alt={animal.name}
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: 8, marginBottom: "1rem" }}
          />
          <p><strong>Especie:</strong> {animal.species}</p>
          <p><strong>Edad:</strong> {animal.age} años</p>
          <p><strong>Vacunado:</strong> {animal.vaccinated ? "Sí" : "No"}</p>
          {animal.description && <p><strong>Descripción:</strong> {animal.description}</p>}
          <button onClick={() => setShowDetails(false)} style={{ marginTop: "1rem" }}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};
