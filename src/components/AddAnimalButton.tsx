import { useState } from "react";
import type { Animal } from "../types/Animals";
import { AnimalForm } from "./AnimalForm";
import { animalService } from "../services/animalService";


type Props = {
  onAdd: (animal: Animal) => void;
};

export const AddAnimalButton = ({ onAdd }: Props) => {
  const [showForm, setShowForm] = useState(false);

const handleAddAnimal = async (animal: Omit<Animal, "id">) => {
  const saved = await animalService.addAnimal(animal);
  onAdd(saved);
  setShowForm(false);
};

  return (
    <>
      <button onClick={() => setShowForm(true)}>
        ➕ Añadir mascota
      </button>

      {showForm && (
        <AnimalForm
          onSubmit={handleAddAnimal}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
};
