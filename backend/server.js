import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "tu-secreto-seguro";

const app = express();
app.use(cors());
app.use(express.json());

const router = jsonServer.router("db.json");
const db = router.db;

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

// --- REGISTRO ---
app.post("/auth/register", async (req, res) => {
  const { email, name, telefono, password, numberVet, role } = req.body ?? {};

  if (!email || !password || !name || !telefono || !numberVet) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "El email ya está registrado" });

  const passwordHash = await bcrypt.hash(password, 10);
  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    telefono,
    numberVet,
    role: role ?? "veterinary",
    animals: [],
    passwordHash,
  };

  users.push(newUser).write();
  const token = signToken(newUser);

  return res.status(201).json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
  });
});

// --- LOGIN ---
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = db.get("users").find({ email }).value();
  
  if (!user || !user.passwordHash) return res.status(401).json({ message: "Credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);
  const userResponse = { ...user };
  delete userResponse.passwordHash;

  return res.json({ token, user: userResponse });
});

// --- AÑADIR ANIMAL (CON ID SEGURO) ---
app.post("/animals", (req, res) => {
  const { name, species, age, vaccinated, description, imageUrl, userId } = req.body;

  if (!name || !species || age == null || vaccinated == null || !userId) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const users = db.get("users");
  const user = users.find({ id: userId }).value();
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  // Lógica para encontrar el ID más alto y sumar 1
  const animalsCollection = db.get("animals");
  const currentAnimals = animalsCollection.value() || [];
  
  const maxNumber = currentAnimals.reduce((max, animal) => {
    // Extraemos el número después de la 'a' (ej: de 'a12' sacamos 12)
    const num = parseInt(animal.id.substring(1));
    return !isNaN(num) && num > max ? num : max;
  }, 0);

  const nextId = `a${maxNumber + 1}`;

  const newAnimal = {
    id: nextId,
    name,
    species,
    age,
    vaccinated,
    description: description || "",
    imageUrl: imageUrl || "",
  };

  // 1. Guardar en colección global
  animalsCollection.push(newAnimal).write();

  // 2. Guardar en el array del usuario
  if (!Array.isArray(user.animals)) user.animals = [];
  user.animals.push(newAnimal); // Guardamos el objeto completo para mantener tu estructura actual
  users.find({ id: userId }).assign({ animals: user.animals }).write();

  return res.status(201).json(newAnimal);
});

// --- ELIMINAR ANIMAL ---
app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;

  const animalExists = db.get("animals").find({ id }).value();
  if (!animalExists) return res.status(404).json({ message: "Animal no encontrado" });

  // Eliminar de colección global
  db.get("animals").remove({ id }).write();

  // Eliminar de todos los usuarios donde aparezca
  db.get("users").value().forEach((user) => {
    if (Array.isArray(user.animals)) {
      const filtered = user.animals.filter((a) => {
        const animalId = typeof a === "object" ? a.id : a;
        return animalId !== id;
      });
      db.get("users").find({ id: user.id }).assign({ animals: filtered }).write();
    }
  });

  return res.json({ message: "Animal eliminado" });
});

// --- ACTUALIZAR ANIMAL ---
app.put("/animals/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const animal = db.get("animals").find({ id }).value();
  if (!animal) return res.status(404).json({ message: "Animal no encontrado" });

  const updatedAnimal = { ...animal, ...data, id }; // Aseguramos que el ID no cambie

  // Actualizar en colección global
  db.get("animals").find({ id }).assign(updatedAnimal).write();

  // Actualizar en todos los usuarios
  db.get("users").value().forEach((user) => {
    if (Array.isArray(user.animals)) {
      const updatedList = user.animals.map((a) => {
        const animalId = typeof a === "object" ? a.id : a;
        return animalId === id ? updatedAnimal : a;
      });
      db.get("users").find({ id: user.id }).assign({ animals: updatedList }).write();
    }
  });

  return res.json(updatedAnimal);
});

// --- GET ANIMAL POR ID ---
app.get("/animals/:id", (req, res) => {
  const { id } = req.params;
  const animal = db.get("animals").find({ id }).value();
  if (!animal) return res.status(404).json({ message: "No encontrado" });
  res.json(animal);
});

// --- GET ANIMALES DE UN USUARIO ---
app.get("/users/:id/animals", (req, res) => {
  const { id } = req.params;
  const user = db.get("users").find({ id: parseInt(id) }).value();
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user.animals || []);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});