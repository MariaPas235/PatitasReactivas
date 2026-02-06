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

// json-server router para persistencia rápida
const router = jsonServer.router("db.json");
const db = router.db;

// Función para firmar JWT
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
    user: { ...newUser, password: password }, // devuelve password plano por ahora
  });
});

// --- LOGIN ---
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan email o password" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);

  return res.json({
    token,
    user: { ...user, password: user.password }, // devuelve password plano por ahora
  });
});

// --- AÑADIR ANIMAL ---
app.post("/animals", (req, res) => {
  const { name, species, age, vaccinated, description, imageUrl, userId } = req.body;

  if (!name || !species || age == null || vaccinated == null || !userId) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const users = db.get("users");
  const user = users.find({ id: userId }).value();
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const animalsCollection = db.get("animals");
  const nextId = `a${(animalsCollection.size().value() ?? 0) + 1}`; // id tipo a1, a2...

  const newAnimal = {
    id: nextId,
    name,
    species,
    age,
    vaccinated,
    description: description || "",
    imageUrl: imageUrl || "",
  };

  // 1️⃣ Guardar en colección global
  animalsCollection.push(newAnimal).write();

  // 2️⃣ Asegurar que user.animals es un array antes de pushear
  if (!Array.isArray(user.animals)) {
    user.animals = [];
  }
  
  // 3️⃣ Guardar dentro del usuario (objeto completo)
  user.animals.push(newAnimal);
  users.find({ id: userId }).assign(user).write();

  return res.status(201).json(newAnimal);
});

// --- ELIMINAR ANIMAL ---
app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;

  const animal = db.get("animals").find({ id }).value();
  if (!animal) return res.status(404).json({ message: "Animal no encontrado" });

  // eliminar de colección global
  db.get("animals").remove({ id }).write();

  // eliminar de todos los usuarios (maneja tanto IDs como objetos completos)
  db.get("users")
    .value()
    .forEach((user) => {
      if (Array.isArray(user.animals)) {
        user.animals = user.animals.filter((a) => {
          // Si es un objeto animal, compara por id
          if (typeof a === "object" && a !== null) {
            return a.id !== id;
          }
          // Si es un string (id), compara directamente
          return a !== id;
        });
        db.get("users").find({ id: user.id }).assign(user).write();
      }
    });

  return res.json({ message: "Animal eliminado" });
});

// --- GET usuario por ID ---
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = db.get("users").find({ id: parseInt(id) }).value();
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

// --- GET usuarios y animales (para tests) ---
app.get("/test/users", (req, res) => {
  const users = db.get("users").value();
  res.json(users);
});

app.get("/test/animals", (req, res) => {
  const animals = db.get("animals").value();
  res.json(animals);
});

// json-server router para CRUD general
app.use(router);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

