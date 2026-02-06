import type { Animal } from "../types/Animals";
import { authService } from "./authService";

const API_URL = "http://localhost:3000";

class AnimalService {
  async addAnimal(animal: Omit<Animal, "id">): Promise<Animal> {
    const session = authService.getSession();
    if (!session) throw new Error("No hay sesión");

    const res = await fetch(`${API_URL}/animals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...animal, userId: session.user.id }),
    });

    if (!res.ok) throw new Error("Error creando animal");

    return res.json();
  }

  async getUserAnimals(userId: number): Promise<Animal[]> {
    const res = await fetch(`${API_URL}/users/${userId}`);
    if (!res.ok) throw new Error("Error obteniendo mascotas");
    const user = await res.json();
    return user.animals || [];
  }

  async deleteAnimal(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/animals/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error eliminando animal");
  }
}

export const animalService = new AnimalService();
