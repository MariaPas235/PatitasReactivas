import { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { authService } from "../../services/authService";
import { useToast } from "../../components/ToastProvider";

const ProfilePage = () => {
  const session = authService.getSession();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  const handleSave = (updatedData: {
    name: string;
    telefono: string;
    numberVet: string;
  }) => {
    setLoading(true);
    authService
      .updateUser(session.user.id, updatedData)
      .then((updatedUser) => {
        authService.saveSession({ token: session.token, user: updatedUser });
        showToast({ message: "Perfil actualizado", type: "success" });
      })
      .catch((err) => {
        console.error(err);
        showToast({ message: "Error actualizando perfil", type: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="content-page centered-page">
      <div className="surface-card">
        <h1 className="page-title">Perfil</h1>
        <AuthForm
          mode="profile"
          onSubmit={handleSave}
          loading={loading}
          hideTitle
          initialValues={{
            name: session.user.name,
            telefono: session.user.telefono,
            numberVet: session.user.numberVet,
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
