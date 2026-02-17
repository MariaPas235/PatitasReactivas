import { useNavigate } from "react-router-dom";
import { animalService } from "../../services/animalService";
import type { Animal } from "../../types/Animals";
import { AnimalForm } from "../../components/AnimalForm";
import { authService } from "../../services/authService";

const AddAnimalPage = () => {
  const navigate = useNavigate();
  const session = authService.getSession();
  if (!session) return null;

  const handleFormSubmit = (animalData: Omit<Animal, "id">) => {
    animalService
      .addAnimal(animalData)
      .then(() => {
        alert("Mascota creada correctamente");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Error al crear la mascota");
      });
  };

  return (
    <div className="content-page">
      <div className="surface-card">
        <h1 className="page-title">Crear nueva mascota</h1>
        <AnimalForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default AddAnimalPage;
