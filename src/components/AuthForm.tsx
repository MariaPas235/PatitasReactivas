import { useState } from "react";
import type { User } from "../types/Auth";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = Omit<User, "id" | "animals">;

type Props =
  | {
      mode: "login";
      onSubmit: (data: LoginPayload) => void;
      loading?: boolean;
    }
  | {
      mode: "register";
      onSubmit: (data: RegisterPayload) => void;
      loading?: boolean;
    };

const AuthForm = ({ mode, onSubmit, loading = false }: Props) => {
  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    password: "",
    name: "",
    numberVet: "",
    telefono: "",
    role: "veterinary",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      onSubmit({
        email: form.email,
        password: form.password,
      });
    } else {
      onSubmit(form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
    >
      <h2>{mode === "login" ? "Iniciar sesión" : "Registro"}</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {mode === "register" && (
        <>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Nº Colegiado</label>
            <input
              type="text"
              name="numberVet"
              value={form.numberVet}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Rol</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="veterinary">Veterinario</option>
              <option value="auxiliary">Auxiliar</option>
              <option value="ray-x">Rayos X</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {mode === "login" ? "Entrar" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;
