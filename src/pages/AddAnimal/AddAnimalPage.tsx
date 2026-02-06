import { useNavigate } from "react-router-dom";
import { animalService } from "../../services/animalService";
import type { Animal } from "../../types/Animals";
import { AnimalForm } from "../../components/AnimalForm";
import { authService } from "../../services/authService";

const AddAnimalPage = () => {
  const navigate = useNavigate();
  const session = authService.getSession();
  if (!session) return null;

  // ✅ Función que maneja el submit del formulario
  const handleFormSubmit = (animalData: Omit<Animal, "id">) => {
    // Llamada async dentro de la función sin marcarla como async
    animalService.addAnimal(animalData)
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
    <div style={{ padding: "2rem" }}>
      <h1>Crear nueva mascota</h1>
      <AnimalForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddAnimalPage;
