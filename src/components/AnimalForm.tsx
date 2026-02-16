import { useState } from "react";
import type { Animal } from "../types/Animals";

type Props = {
  onSubmit: (animal: Omit<Animal, "id">) => void;
  onCancel?: () => void; // ✅ añadimos esta prop opcional
  initial?: Omit<Animal, "id">; // datos iniciales para editar
};

export const AnimalForm = ({ onSubmit, onCancel, initial }: Props) => {
  const [name, setName] = useState(() => initial?.name ?? "");
  const [species, setSpecies] = useState(() => initial?.species ?? "");
  const [age, setAge] = useState<number>(() => initial?.age ?? 0);
  const [vaccinated, setVaccinated] = useState(() => initial?.vaccinated ?? false);
  const [description, setDescription] = useState(() => initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(() => initial?.imageUrl ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, species, age, vaccinated, description, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <input value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Especie" required />
      <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} placeholder="Edad" required />
      <label>
        <input type="checkbox" checked={vaccinated} onChange={(e) => setVaccinated(e.target.checked)} />
        Vacunado
      </label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL imagen" />

      <div style={{ display: "flex", gap: "1rem" }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};
