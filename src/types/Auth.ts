import type { Animal } from "./Animals";


export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  numberVet: string;
  telefono: string;
  role:  "veterinary" | "auxiliary" | "ray-x";
  animals?: Animal[]; 
};

export type AuthSession = {
  token: string;
  user: User;
};

export type AuthResponse = AuthSession;