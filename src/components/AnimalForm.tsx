import { useState } from "react";
import type { Animal } from "../types/Animals";
import Button from "./Button";

type Props = {
  onSubmit: (animal: Omit<Animal, "id">) => void;
  onCancel?: () => void;
  initial?: Omit<Animal, "id">;
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
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-field">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-field">
        <label>Especie</label>
        <input value={species} onChange={(e) => setSpecies(e.target.value)} required />
      </div>

      <div className="form-field">
        <label>Edad</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
      </div>

      <label className="form-field checkbox-field">
        <input
          type="checkbox"
          checked={vaccinated}
          onChange={(e) => setVaccinated(e.target.checked)}
        />
        Vacunado
      </label>

      <div className="form-field">
        <label>Descripcion</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-field">
        <label>URL imagen</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>

      {onCancel ? (
        <div className="form-actions">
          <Button type="submit">Guardar</Button>
          <Button type="button" variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      ) : (
        <Button type="submit">Guardar</Button>
      )}
    </form>
  );
};
