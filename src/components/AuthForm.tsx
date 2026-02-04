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
    <form onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Iniciar sesión" : "Registro"}</h2>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      {mode === "register" && (
        <>
          <label>
            Nombre
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nº Colegiado
            <input
              type="text"
              name="numberVet"
              value={form.numberVet}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Teléfono
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rol
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
          </label>
        </>
      )}

      <label>
        Contraseña
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {mode === "login" ? "Entrar" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;
