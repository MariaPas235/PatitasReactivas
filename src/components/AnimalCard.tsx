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
  
  // Estados para los detalles detallados
  const [showDetails, setShowDetails] = useState(false);
  const [detailedAnimal, setDetailedAnimal] = useState<Animal | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Función para cargar los datos del servidor por ID
  const fetchDetails = async () => {
    setLoadingDetails(true);
    setShowDetails(true);
    try {
      const data = await animalService.getAnimalById(animal.id);
      setDetailedAnimal(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo obtener la información actualizada.");
      setShowDetails(false); // Cerramos el modal si falla
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Eliminar ${animal.name}?`)) return;
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
    <div className="animal-card">
      <img src={animal.imageUrl} alt={animal.name} className="animal-thumb" />
      <h3 className="animal-name">{animal.name}</h3>

      <div className="card-actions">
        <button onClick={() => setEditing(true)} disabled={updating}>
          {editing ? "Cerrar" : "Editar"}
        </button>
        <button className="btn-danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
        {/* Ahora llamamos a la función que busca por ID */}
        <button onClick={fetchDetails}>
          {loadingDetails ? "Cargando..." : "Ver detalles"}
        </button>
      </div>

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

      {showDetails && (
        <Modal onClose={() => setShowDetails(false)}>
          {loadingDetails ? (
            <p>Cargando datos del servidor...</p>
          ) : detailedAnimal ? (
            <>
              <h2>{detailedAnimal.name}</h2>
              <img src={detailedAnimal.imageUrl} alt={detailedAnimal.name} className="animal-cover" />
              <p><strong>Especie:</strong> {detailedAnimal.species}</p>
              <p><strong>Edad:</strong> {detailedAnimal.age} años</p>
              <p><strong>Vacunado:</strong> {detailedAnimal.vaccinated ? "Si" : "No"}</p>
              {detailedAnimal.description && (
                <p><strong>Descripción:</strong> {detailedAnimal.description}</p>
              )}
              <button onClick={() => setShowDetails(false)}>Cerrar</button>
            </>
          ) : (
            <p>Error al cargar los datos.</p>
          )}
        </Modal>
      )}
    </div>
  );
};