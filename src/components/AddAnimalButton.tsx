import type { Animal } from "../types/Animals";

type Props = {
  onAdd: (animal: Animal) => void;
};

const AddAnimalButton = ({ onAdd }: Props) => {
  const handleClick = () => {
    const newAnimal: Animal = {
      id: Date.now().toString(),
      name: "Nueva mascota",
      species: "Perro",
      age: 1,
      vaccinated: false,
    };
    onAdd(newAnimal);
  };

  return (
    <button onClick={handleClick} style={{ padding: "0.5rem 1rem" }}>
      Añadir mascota
    </button>
  );
};

export default AddAnimalButton;
