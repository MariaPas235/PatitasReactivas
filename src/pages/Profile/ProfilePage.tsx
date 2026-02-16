import { useState } from "react";
import { authService } from "../../services/authService";

const ProfilePage = () => {
  const session = authService.getSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [telefono, setTelefono] = useState(session?.user.telefono ?? "");
  const [numberVet, setNumberVet] = useState(session?.user.numberVet ?? "");

  if (!session) return null;

  const handleSave = () => {
    // Persistir en backend y actualizar sesión
    const updatedData = { name, telefono, numberVet };
    authService.updateUser(session.user.id, updatedData)
      .then((updatedUser) => {
        authService.saveSession({ token: session.token, user: updatedUser });
        alert("Perfil actualizado");
      })
      .catch((err) => {
        console.error(err);
        alert("Error actualizando perfil");
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Perfil</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
        <input value={numberVet} onChange={(e) => setNumberVet(e.target.value)} placeholder="Número de veterinario" />
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default ProfilePage;
