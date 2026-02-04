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

// Función para firmar JWT
function signToken(user) { // sin : any
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
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists)
    return res.status(409).json({ message: "El email ya está registrado" });

  const passwordHash = await bcrypt.hash(password, 10);
  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    telefono,
    password,
    numberVet,
    role: role ?? "veterinary", // default
    animals: [],
    passwordHash,
  };

  users.push(newUser).write();

  const token = signToken(newUser);

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      telefono: newUser.telefono,
      password: newUser.password,
      numberVet: newUser.numberVet,
      role: newUser.role,
      animals: newUser.animals,
    },
  });
});

// --- LOGIN (POST)
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan email o password" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user)
    return res.status(401).json({ message: "Credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      telefono: user.telefono,
      password: user.password,
      numberVet: user.numberVet,
      role: user.role,
      animals: user.animals ?? [],
    },
  });
});

// --- TEST: VER TODOS LOS USUARIOS ---
app.get("/test/users", (req, res) => {
  const users = db.get("users").value();
  const safeUsers = users.map(({ passwordHash, ...user }) => user);
  res.json(safeUsers);
});

// json-server router para manejar el resto de rutas CRUD si quieres
app.use(router);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
