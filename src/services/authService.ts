import type { AuthResponse, User } from "../types/Auth";

const API_URL = "http://localhost:3000/auth"; // tu backend

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = Omit<User, "id" | "animals">;

class AuthService {
  async login(data: LoginPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error en login");

    const auth: AuthResponse = await res.json();
    this.saveSession(auth); // 🔹 guarda sesión
    return auth;
  }

  async register(data: RegisterPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error en registro");

    const auth: AuthResponse = await res.json();
    this.saveSession(auth); // 🔹 guarda sesión
    return auth;
  }

  logout() {
    localStorage.removeItem("auth");
  }

  getSession(): AuthResponse | null {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getSession()?.token;
  }

  private saveSession(auth: AuthResponse) {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
}

export const authService = new AuthService();
