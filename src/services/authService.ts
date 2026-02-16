import type { AuthResponse, User } from "../types/Auth";

const API_URL = "http://localhost:3000/auth"; // tu backend
const API_BASE = "http://localhost:3000";

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
    this.notifySubscribers(null);
  }

  getSession(): AuthResponse | null {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getSession()?.token;
  }

   saveSession(auth: AuthResponse) {
    localStorage.setItem("auth", JSON.stringify(auth));
    this.notifySubscribers(auth);
  }

  // --- simple subscription API so UI can react to session changes ---
  private subscribers: Array<(auth: AuthResponse | null) => void> = [];

  subscribe(cb: (auth: AuthResponse | null) => void) {
    this.subscribers.push(cb);
    // immediately call with current value
    try {
      cb(this.getSession());
    } catch (e) {
      console.error("Error in auth subscriber callback", e);
    }
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notifySubscribers(auth: AuthResponse | null) {
    this.subscribers.forEach((cb) => {
      try {
        cb(auth);
      } catch (e) {
        console.error("Error in auth subscriber callback", e);
      }
    });
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error actualizando usuario");

    return res.json();
  }
}

export const authService = new AuthService();
