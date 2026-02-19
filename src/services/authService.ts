import type { AuthResponse, User } from "../types/Auth";

const API_URL = "http://localhost:3000/auth"; 
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

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Las credenciales no son validas");
      }
      const message = await this.extractErrorMessage(res, "Error al iniciar sesion");
      throw new Error(message);
    }

    const auth: AuthResponse = await res.json();
    this.saveSession(auth); 
    return auth;
  }

  async register(data: RegisterPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("El email ya se encuentra registrado en la base de datos");
      }
      const message = await this.extractErrorMessage(res, "Error en registro");
      throw new Error(message);
    }

    const auth: AuthResponse = await res.json();
    this.saveSession(auth); 
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

 
  private subscribers: Array<(auth: AuthResponse | null) => void> = [];

  subscribe(cb: (auth: AuthResponse | null) => void) {
    this.subscribers.push(cb);
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
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error actualizando usuario");

    return res.json();
  }

  async validateSession(): Promise<boolean> {
    const session = this.getSession();

    if (!session) return false;

    try {
      const res = await fetch(`${API_BASE}/users/${session.user.id}`);
      return res.ok;
    } catch {
      return false;
    }
  }

  private async extractErrorMessage(res: Response, fallback: string): Promise<string> {
    try {
      const data = (await res.json()) as { message?: string };
      return data.message?.trim() || fallback;
    } catch {
      return fallback;
    }
  }
}

export const authService = new AuthService();
