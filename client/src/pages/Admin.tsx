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
  categories: number[];
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
        const videosWithCategories = await Promise.all(
          videos.map(async (video: Video) => {
            const categoriesResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/videocategory/categories/${video.id}`,
            );
            const videoCategories = await categoriesResponse.json();
            return {
              ...video,
              categories: videoCategories.map((cat: Category) => cat.id),
            };
          }),
        );

        setCategory(categories);
        setVideo(videosWithCategories);
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
      <ModalCategoryManager
        isShowing={isShowingCategory}
        hide={() => toggleCategory()}
        category={editingCategory}
        isEdit={!!editingCategory}
        onSubmit={async (categoryData) => {
          try {
            const url = editingCategory?.id
              ? `${import.meta.env.VITE_API_URL}/api/categories/${editingCategory.id}`
              : `${import.meta.env.VITE_API_URL}/api/categories`;

            const response = await fetch(url, {
              method: editingCategory?.id ? "PUT" : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(categoryData),
            });

            if (response.ok) {
              const result = await response.json();
              const categoryResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/categories/${result.insertId}`,
              );
              const newCategory = await categoryResponse.json();

              setCategory((prevCategories) =>
                editingCategory?.id
                  ? prevCategories.map((c) =>
                      c.id === editingCategory.id
                        ? { ...c, ...categoryData }
                        : c,
                    )
                  : [...prevCategories, newCategory],
              );
              toggleCategory();
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
        isEdit={!!editingVideo}
        onSubmit={async (videoData) => {
          try {
            const isEditing = !!editingVideo?.id;
            const url = isEditing
              ? `${import.meta.env.VITE_API_URL}/api/videos/${editingVideo.id}`
              : `${import.meta.env.VITE_API_URL}/api/videos`;

            const response = await fetch(url, {
              method: isEditing ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(videoData),
            });

            if (!response.ok) {
              console.error(
                "Erreur lors de la mise à jour/création de la vidéo",
              );
              return;
            }
            const result = await response.json();
            const videoId = isEditing ? editingVideo.id : result.insertId;

            const categoriesResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/videocategory/${videoId}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryIds: videoData.categories }),
              },
            );

            if (!categoriesResponse.ok) {
              console.error("Erreur lors de la mise à jour des catégories");
              return;
            }

            const updatedVideo = { ...videoData, id: videoId };

            setVideo((prevVideos) =>
              isEditing
                ? prevVideos.map((vid) =>
                    vid.id === editingVideo?.id
                      ? { ...vid, ...updatedVideo }
                      : vid,
                  )
                : [...prevVideos, updatedVideo],
            );
            toggleVideo();
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
          <button
            className="add-card-manager"
            type="button"
            onClick={
              adminSection === "categories"
                ? () => toggleCategory()
                : adminSection === "videos"
                  ? () => toggleVideo()
                  : undefined
            }
          >
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
                  categories={vid.categories}
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
