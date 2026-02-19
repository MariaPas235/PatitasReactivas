import type { Animal } from "../types/Animals";
import { animalService } from "../services/animalService";
import { useState } from "react";
import { AnimalForm } from "./AnimalForm";
import Modal from "./Modal";
import { useToast } from "./ToastProvider";
import Button from "./Button";

type Props = {
  animal: Animal;
  onDeleted?: (id: string) => void;
  onUpdated?: (animal: Animal) => void;
};

export const AnimalCard = ({ animal, onDeleted, onUpdated }: Props) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [detailedAnimal, setDetailedAnimal] = useState<Animal | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchDetails = async () => {
  
  setDetailedAnimal(null); 
  
  setLoadingDetails(true);
  setShowDetails(true);

  try {
    const data = await animalService.getAnimalById(animal.id);
    setDetailedAnimal(data);
  } catch (err) {
    console.error(err);
    showToast({ message: "No se pudo obtener la información", type: "error" });
    setShowDetails(false);
  } finally {
    setLoadingDetails(false);
  }
};

  const handleDeleteConfirm = async () => {
    setLoading(true);

    try {
      await animalService.deleteAnimal(animal.id);
      onDeleted?.(animal.id);
      showToast({ message: "Mascota eliminada", type: "success" });
      setConfirmingDelete(false);
    } catch (err) {
      console.error(err);
      showToast({ message: "Error eliminando la mascota", type: "error" });
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
      showToast({ message: "Mascota actualizada", type: "success" });
    } catch (err) {
      console.error(err);
      showToast({ message: "Error actualizando la mascota", type: "error" });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="animal-card">
      <img src={animal.imageUrl} alt={animal.name} className="animal-thumb" />
      <h3 className="animal-name">{animal.name}</h3>

      <div className="card-actions">
        <Button onClick={() => setEditing(true)} disabled={updating}>
          {editing ? "Cerrar" : "Editar"}
        </Button>
        <Button variant="danger" onClick={() => setConfirmingDelete(true)} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
        <Button onClick={fetchDetails}>
          {loadingDetails ? "Cargando..." : "Ver detalles"}
        </Button>
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
              <p>
                <strong>Especie:</strong> {detailedAnimal.species}
              </p>
              <p>
                <strong>Edad:</strong> {detailedAnimal.age} años
              </p>
              <p>
                <strong>Vacunado:</strong> {detailedAnimal.vaccinated ? "Si" : "No"}
              </p>
              {detailedAnimal.description && (
                <p>
                  <strong>Descripcion:</strong> {detailedAnimal.description}
                </p>
              )}
              <Button onClick={() => setShowDetails(false)}>Cerrar</Button>
            </>
          ) : (
            <p>Error al cargar los datos.</p>
          )}
        </Modal>
      )}

      {confirmingDelete && (
        <Modal onClose={loading ? undefined : () => setConfirmingDelete(false)}>
          <h2>Confirmar eliminacion</h2>
          <p className="modal-text">
            Vas a eliminar a <strong>{animal.name}</strong>. Esta accion no se puede deshacer.
          </p>
          <div className="modal-actions">
            <Button type="button" onClick={() => setConfirmingDelete(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="button" variant="danger" onClick={handleDeleteConfirm} disabled={loading}>
              {loading ? "Eliminando..." : "Si, eliminar"}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

