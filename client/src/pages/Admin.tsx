import { useEffect, useState } from "react";
import CardCategoryManager from "../components/CardCategoryManager";
import CardUserManager from "../components/CardUserManager";
import CardVideoManager from "../components/CardVideoManager";
import Header from "../components/Header";
import "../styles/Admin.css";
import categoriesPic from "../assets/images/category-management.png";
import usersPic from "../assets/images/users-management.png";
import videosPic from "../assets/images/video-management.png";
import NavBar from "../components/NavBar";

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
      <Header />
      <div className="admin-page">
        <nav className="nav-admin">
          <button
            className="button-nav-admin"
            type="button"
            onClick={() => setAdminSection("users")}
          >
            <img width={30} src={usersPic} alt="" />
            <p>Users</p>
          </button>
          <button
            className="button-nav-admin"
            type="button"
            onClick={() => setAdminSection("categories")}
          >
            <img width={30} src={categoriesPic} alt="" />
            <p>Categories</p>
          </button>
          <button
            className="button-nav-admin"
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

        <button className="add-card-manager" type="button">
          + Ajouter
        </button>
        {isLoading ? (
          <div>Chargement en cours...</div>
        ) : (
          <>
            {adminSection === "categories" &&
              category.map((cat) => (
                <CardCategoryManager
                  key={cat.id}
                  name={cat.name}
                  description={cat.description}
                  url_image={cat.url_image}
                />
              ))}
            {adminSection === "videos" &&
              video.map((vid) => (
                <CardVideoManager
                  key={vid.id}
                  title={vid.title}
                  description={truncateText(vid.description)}
                  duration={formatTime(vid.date.toString())}
                  video_url={vid.video_url}
                  date={formatDate(vid.date.toString())}
                  views={vid.views}
                />
              ))}
            {adminSection === "users" &&
              user.map((user) => (
                <CardUserManager
                  key={user.id}
                  pseudo={user.pseudo}
                  email={user.email}
                  avatar_url={user.avatar_url}
                  is_admin={user.is_admin}
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
