import { useState } from "react";
import imgProfile from "../assets/images/user-solid.svg";
import "../styles/UserModal.css";
import { useOutletContext } from "react-router-dom";
import { useSpreadProfileImage } from "../contexts/ProfileImageProvider";

type User = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
};

type Auth = {
  user: User;
  token: string;
};

export default function UserProfileSettings() {
  const { setAuth } = useOutletContext() as {
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  };

  const { spreadProfileImage, setSpreadProfileImage } = useSpreadProfileImage();

  const localUser = localStorage.getItem("user");
  const parsedUser: User = localUser
    ? JSON.parse(localUser)
    : {
        id: 0,
        email: "",
        pseudo: "",
        avatar_url: imgProfile,
      };

  const [user, setUser] = useState<User>({
    id: parsedUser.id,
    email: parsedUser.email,
    pseudo: parsedUser.pseudo,
    avatar_url: parsedUser.avatar_url,
  });

  const [__, setSelectedImage] = useState<string | null>(spreadProfileImage);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageSuccess, setImageSuccess] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      setImageError("Aucun fichier sélectionné");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Seuls les fichiers JPEG, PNG ou GIF sont autorisés");
      return;
    }

    const formData = new FormData();
    formData.append("avatar_url", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${
          parsedUser?.id
        }/upload-avatar`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      if (!response.ok) {
        const errorText = await response.text();
        setImageError(`Erreur lors de la mise à jour de l'image: ${errorText}`);
        console.error("Erreur réponse:", errorText);
        return;
      }
      const data = await response.json();

      setImageSuccess("Image mise à jour avec succès !");
      setImageError(null);

      setUser((prev) => ({ ...prev, avatar_url: data.avatar_url }));
      setSpreadProfileImage(data.avatar_url);
      setSelectedImage(data.avatar_url);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...parsedUser, avatar_url: data.avatar_url }),
      );
    } catch (error) {
      console.error("Erreur de mise à jour d'image :", error);
      setImageError("Erreur lors de l'envoi de l'image.");
    }
  };

  const [pseudoError, setPseudoError] = useState<string | null>(null);
  const [pseudoSuccess, setPseudoSuccess] = useState<string | null>(null);
  const handlePseudoChange = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${parsedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
            pseudo: user.pseudo,
            avatar_url: imgProfile,
          }),
        },
      );
      const contentType = response.headers.get("Content-Type");
      if (response.ok) {
        if (contentType?.includes("application/json")) {
          await response.json();
          setPseudoSuccess("Votre pseudo a été mis à jour avec succès !");
          setPseudoError(null);

          const updatedUser = { ...parsedUser, pseudo: user.pseudo };

          setAuth((prevAuth) => {
            if (!prevAuth) return null;
            return { ...prevAuth, user: updatedUser };
          });

          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } else {
        const errorText = await response.text();
        setPseudoError(
          errorText ||
            "Une erreur est survenue lors de la mise à jour du pseudo",
        );
        setPseudoSuccess(null);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo", error);
      setPseudoError(
        "Une erreur est survenue lors de la mise à jour du pseudo",
      );
      setPseudoSuccess(null);
    }
  };

  const [emailConfirmation, setEmailConfirmation] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

  const handleEmailChange = async () => {
    if (user.email !== emailConfirmation) {
      setEmailError("Les adresses emails ne correspondent pas");
      setEmailSuccess(null);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${parsedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
            pseudo: user.pseudo,
            avatar_url: imgProfile,
          }),
        },
      );
      const contentType = response.headers.get("Content-Type");
      if (response.ok) {
        if (contentType?.includes("application/json")) {
          const data = await response.json();
          setEmailSuccess(data.message);
          setEmailError(null);
        } else {
          setEmailSuccess(
            "Votre adresse e-mail a été mise à jour avec succès !",
          );
          setEmailError(null);
        }
      } else {
        const errorText = await response.text();
        setEmailError(
          errorText ||
            "Une erreur est survenue lors de la mise à jour de l'email",
        );
        setEmailSuccess(null);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'email:", error);
      setEmailError(
        "Une erreur est survenue lors de la mise à jour de l'email",
      );
      setEmailSuccess(null);
    }
  };

  return (
    <>
      <label className="first-button" htmlFor="upload-image">
        Modifier l'image
      </label>
      <div>
        <input
          id="upload-image"
          className="imageSetting"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <img
          src={imgProfile || user.avatar_url}
          alt="Profile"
          className="profile-picture"
        />
      </div>
      {imageError && <p className="error">{imageError}</p>}
      {imageSuccess && <p className="success">{imageSuccess}</p>}
      <div className="profileSetting">
        <label className="second-button" htmlFor="Pseudo">
          Modifier le pseudo
        </label>
        <input
          type="text"
          placeholder="Pseudo*"
          value={user.pseudo}
          onChange={(e) => setUser({ ...user, pseudo: e.target.value })}
          className="input-area"
        />
        {pseudoError && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {pseudoError}
          </p>
        )}
        {pseudoSuccess && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {pseudoSuccess}
          </p>
        )}
        <button
          type="button"
          className="input-area button"
          onClick={handlePseudoChange}
        >
          Valider
        </button>
      </div>
      <div className="profileSetting">
        <label className="second-button" htmlFor="Nouvel email">
          Modifier l'adresse email
        </label>
        <input
          type="text"
          placeholder="Nouvel email*"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="input-area"
        />
        <input
          type="text"
          placeholder="Confirmation du nouvel email*"
          value={emailConfirmation}
          onChange={(e) => {
            setEmailConfirmation(e.target.value);
          }}
          className="input-area"
        />
        {emailError && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {emailError}
          </p>
        )}
        {emailSuccess && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {emailSuccess}
          </p>
        )}
        <button
          type="button"
          className="input-area button"
          onClick={handleEmailChange}
        >
          Valider
        </button>
      </div>
    </>
  );
}
