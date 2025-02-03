import { useEffect, useState } from "react";
import CardCategoryManager from "../components/CardCategoryManager";
import CardUserManager from "../components/CardUserManager";
import CardVideoManager from "../components/CardVideoManager";
import Header from "../components/Header";
import "../styles/Admin.css";
import categoriesPic from "../assets/images/category-management.png";
import usersPic from "../assets/images/users-management.png";
import videosPic from "../assets/images/video-management.png";
import ModalCategoryManager from "../components/ModalCategoryManager";
import ModalUserManager from "../components/ModalUserManager";
import ModalVideoManager from "../components/ModalVideoManager";
import NavBar from "../components/NavBar";
import useModal from "../services/useModal";

const truncateText = (text: string, maxLength = 80) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

interface Category {
  id: number;
  name: string;
  url_image: string;
  description: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  video_url: string;
  date: string;
  views: number;
}

interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
  is_admin: boolean;
}

export default function Admin() {
  const [category, setCategory] = useState<Category[]>([]);
  const [video, setVideo] = useState<Video[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [adminSection, setAdminSection] = useState("users");
  const [isLoading, setIsLoading] = useState(true);
  const handleCategoryDelete = (deletedId: number) => {
    setCategory((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== deletedId),
    );
  };

  const handleUserDelete = (deletedId: number) => {
    setUser((prevUsers) => prevUsers.filter((user) => user.id !== deletedId));
  };

  const handleVideoDelete = (deletedId: number) => {
    setVideo((prevVideos) => prevVideos.filter((vid) => vid.id !== deletedId));
  };

  const {
    isShowing: isShowingCategory,
    editingId: editingCategoryId,
    toggle: toggleCategory,
  } = useModal();
  const {
    isShowing: isShowingUser,
    editingId: editingUserId,
    toggle: toggleUser,
  } = useModal();
  const {
    isShowing: isShowingVideo,
    editingId: editingVideoId,
    toggle: toggleVideo,
  } = useModal();

  const editingCategory = category.find((cat) => cat.id === editingCategoryId);
  const editingUser = user.find((u) => u.id === editingUserId);
  const editingVideo = video.find((vid) => vid.id === editingVideoId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesRes, videosRes, usersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/api/videos`),
          fetch(`${import.meta.env.VITE_API_URL}/api/users`),
        ]);

        const categories = await categoriesRes.json();
        const videos = await videosRes.json();
        const users = await usersRes.json();

        setCategory(categories);
        setVideo(videos);
        setUser(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ModalCategoryManager
        isShowing={isShowingCategory}
        hide={() => toggleCategory()}
        category={editingCategory}
        onSubmit={async (categoryData) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/categories/${editingCategory?.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: categoryData.name,
                  description: categoryData.description,
                  url_image: categoryData.url_image,
                }),
              },
            );
            if (response.ok) {
              setCategory((categories) =>
                categories.map((cat) =>
                  cat.id === editingCategory?.id
                    ? { ...cat, ...categoryData }
                    : cat,
                ),
              );
              toggleCategory();
            } else {
              console.error("Erreur lors de la mise à jour");
            }
          } catch (error) {
            console.error("Erreur:", error);
          }
        }}
      />
      <ModalUserManager
        isShowing={isShowingUser}
        hide={() => toggleUser()}
        user={editingUser}
        onSubmit={async (userData) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/users/${editingUser?.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: userData.email,
                  pseudo: userData.pseudo,
                  is_admin: userData.is_admin,
                  avatar_url: userData.avatar_url,
                }),
              },
            );
            if (response.ok) {
              setUser((users) =>
                users.map((u) =>
                  u.id === editingUser?.id ? { ...u, ...userData } : u,
                ),
              );
              toggleUser();
            } else {
              console.error("Erreur lors de la mise à jour");
            }
          } catch (error) {
            console.error("Erreur:", error);
          }
        }}
      />
      <ModalVideoManager
        isShowing={isShowingVideo}
        hide={() => toggleVideo()}
        video={editingVideo}
        onSubmit={async (videoData) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/videos/${editingVideo?.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: videoData.title,
                  description: videoData.description,
                  video_url: editingVideo?.video_url,
                  date: editingVideo?.date,
                  views: editingVideo?.views,
                }),
              },
            );
            if (response.ok) {
              setVideo((videos) =>
                videos.map((vid) =>
                  vid.id === editingVideo?.id ? { ...vid, ...videoData } : vid,
                ),
              );
              toggleVideo();
            } else {
              console.error("Erreur lors de la mise à jour");
            }
          } catch (error) {
            console.error("Erreur:", error);
          }
        }}
      />
      <Header />
      <div className="admin-page">
        <nav className="nav-admin">
          <button
            className={`button-nav-admin ${adminSection === "users" ? "button-nav-admin-active" : ""}`}
            type="button"
            onClick={() => setAdminSection("users")}
          >
            <img width={30} src={usersPic} alt="" />
            <p>Users</p>
          </button>
          <button
            className={`button-nav-admin ${adminSection === "categories" ? "button-nav-admin-active" : ""}`}
            type="button"
            onClick={() => setAdminSection("categories")}
          >
            <img width={30} src={categoriesPic} alt="" />
            <p>Categories</p>
          </button>
          <button
            className={`button-nav-admin ${adminSection === "videos" ? "button-nav-admin-active" : ""}`}
            type="button"
            onClick={() => setAdminSection("videos")}
          >
            <img width={30} src={videosPic} alt="" />
            <p>Videos</p>
          </button>
        </nav>
        <h2 className="admin-title">
          Gestion des{" "}
          {adminSection === "categories"
            ? "catégories"
            : adminSection === "videos"
              ? "vidéos"
              : "utilisateurs"}
        </h2>

        {adminSection !== "users" && (
          <button className="add-card-manager" type="button">
            + Ajouter
          </button>
        )}
        {isLoading ? (
          <div>Chargement en cours...</div>
        ) : (
          <>
            {adminSection === "categories" &&
              category.map((cat) => (
                <CardCategoryManager
                  key={cat.id}
                  id={cat.id}
                  name={cat.name}
                  description={cat.description}
                  url_image={cat.url_image}
                  onEdit={() => toggleCategory(cat.id)}
                  onDelete={handleCategoryDelete}
                />
              ))}
            {adminSection === "videos" &&
              video.map((vid) => (
                <CardVideoManager
                  id={vid.id}
                  key={vid.id}
                  title={vid.title}
                  description={truncateText(vid.description)}
                  duration={formatTime(vid.date.toString())}
                  video_url={vid.video_url}
                  date={formatDate(vid.date.toString())}
                  views={vid.views}
                  onEdit={() => toggleVideo(vid.id)}
                  onDelete={handleVideoDelete}
                />
              ))}
            {adminSection === "users" &&
              user.map((user) => (
                <CardUserManager
                  id={user.id}
                  key={user.id}
                  pseudo={user.pseudo}
                  email={user.email}
                  avatar_url={user.avatar_url}
                  is_admin={user.is_admin}
                  onEdit={() => toggleUser(user.id)}
                  onDelete={handleUserDelete}
                />
              ))}
          </>
        )}
      </div>
      <div className="fill-the-gap" />
      <NavBar />
    </>
  );
}
