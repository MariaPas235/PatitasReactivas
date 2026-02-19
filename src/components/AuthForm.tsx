import { useState } from "react";
import type { User } from "../types/Auth";
import Button from "./Button";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = Omit<User, "id" | "animals">;
type ProfilePayload = Pick<User, "name" | "telefono" | "numberVet">;
type FormState = {
  email: string;
  password: string;
  name: string;
  numberVet: string;
  telefono: string;
  role: User["role"];
};

type Props =
  | {
      mode: "login";
      onSubmit: (data: LoginPayload) => void;
      loading?: boolean;
      hideTitle?: boolean;
    }
  | {
      mode: "register";
      onSubmit: (data: RegisterPayload) => void;
      loading?: boolean;
      hideTitle?: boolean;
    }
  | {
      mode: "profile";
      onSubmit: (data: ProfilePayload) => void;
      loading?: boolean;
      initialValues?: ProfilePayload;
      hideTitle?: boolean;
    };

const AuthForm = (props: Props) => {
  const { mode, onSubmit, loading = false, hideTitle = false } = props;
  const initialProfileValues =
    mode === "profile" ? props.initialValues : undefined;

  const [form, setForm] = useState<FormState>(() => {
    if (mode === "profile") {
      return {
        email: "",
        password: "",
        name: initialProfileValues?.name ?? "",
        numberVet: initialProfileValues?.numberVet ?? "",
        telefono: initialProfileValues?.telefono ?? "",
        role: "veterinary",
      };
    }

    return {
      email: "",
      password: "",
      name: "",
      numberVet: "",
      telefono: "",
      role: "veterinary",
    };
  });

  const showRegisterFields = mode === "register" || mode === "profile";

  const isProfileMode = mode === "profile";

  const showEmail = !isProfileMode;
  const showRole = mode === "register";
  const showPassword = !isProfileMode;

  const formTitle = mode === "login" ? "Iniciar sesion" : mode === "register" ? "Registro" : "Perfil";
  const submitLabel = mode === "login" ? "Entrar" : mode === "register" ? "Registrarse" : "Guardar";

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
      return;
    }

    if (mode === "profile") {
      onSubmit({
        name: form.name,
        telefono: form.telefono,
        numberVet: form.numberVet,
      });
      return;
    }

    onSubmit({
      email: form.email,
      password: form.password,
      name: form.name,
      numberVet: form.numberVet,
      telefono: form.telefono,
      role: form.role,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      {!hideTitle && <h2>{formTitle}</h2>}

      {showEmail && (
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {showRegisterFields && (
        <>
          <div className="form-field">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>N. Colegiado</label>
            <input
              type="text"
              name="numberVet"
              value={form.numberVet}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Telefono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>

          {showRole && (
            <div className="form-field">
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
          )}
        </>
      )}

      {showPassword && (
        <div className="form-field">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default AuthForm;
