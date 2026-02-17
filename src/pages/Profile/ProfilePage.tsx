import { useState } from "react";
import { authService } from "../../services/authService";

const ProfilePage = () => {
  const session = authService.getSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [telefono, setTelefono] = useState(session?.user.telefono ?? "");
  const [numberVet, setNumberVet] = useState(session?.user.numberVet ?? "");

  if (!session) return null;

  const handleSave = () => {
    const updatedData = { name, telefono, numberVet };
    authService
      .updateUser(session.user.id, updatedData)
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
    <div className="content-page">
      <div className="surface-card">
        <h1 className="page-title">Perfil</h1>
        <form className="app-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          </div>
          <div className="form-field">
            <label>Telefono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" />
          </div>
          <div className="form-field">
            <label>Numero de veterinario</label>
            <input value={numberVet} onChange={(e) => setNumberVet(e.target.value)} placeholder="Numero de veterinario" />
          </div>
          <button type="button" onClick={handleSave}>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
