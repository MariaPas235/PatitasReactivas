import type { Animal } from "../types/Animals";

type Props = {
  animal: Animal;
};

const AnimalCard = ({ animal }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "0.5rem",
        width: "150px",
      }}
    >
      <h3>{animal.name}</h3>
      <p>Especie: {animal.species}</p>
      <p>Edad: {animal.age} año(s)</p>
      <p>Vacunado: {animal.vaccinated ? "Sí" : "No"}</p>
    </div>
  );
};

export default AnimalCard;
