import { useNavigate } from "react-router-dom";
import { animalService } from "../../services/animalService";
import type { Animal } from "../../types/Animals";
import { AnimalForm } from "../../components/AnimalForm";
import { authService } from "../../services/authService";
import { useToast } from "../../components/ToastProvider";

const AddAnimalPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const session = authService.getSession();

  if (!session) return null;

  const handleFormSubmit = (animalData: Omit<Animal, "id">) => {
    animalService
      .addAnimal(animalData)
      .then(() => {
        showToast({ message: "Mascota creada correctamente", type: "success" });
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        showToast({ message: "Error al crear la mascota", type: "error" });
      });
  };

  return (
    <div className="content-page centered-page">
      <div className="surface-card">
        <h1 className="page-title">Crear nueva mascota</h1>
        <AnimalForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default AddAnimalPage;
