import { useEffect, useState } from "react";
import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import useDeleteVideo from "../services/deleteVideo";
import "../styles/CardVideoManager.css";

interface Category {
  id: number;
  name: string;
}

interface CardVideoManagerProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  video_url: string;
  date: string;
  views: number;
  categories: number[];
  onEdit: () => void;
  onDelete: (deletedId: number) => void;
}

function getVideasVideoId(url: string): string | null {
  const regExp =
    /^.*\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function getVideasThumbnail(url: string): string {
  const videoId = getVideasVideoId(url);
  return videoId ? `https://app.videas.fr/media/${videoId}/thumbnail.jpg` : "";
}

export default function CardVideoManager({
  id,
  title,
  description,
  duration,
  video_url,
  date,
  views,
  categories,
  onEdit,
  onDelete,
}: CardVideoManagerProps) {
  const [categoryNames, setCategoryNames] = useState<Category[]>([]);
  const deleteVideo = useDeleteVideo();

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const fetchedCategories = await Promise.all(
          categories.map((categoryId) =>
            fetch(`http://localhost:3310/api/categories/${categoryId}`).then(
              (res) => res.json(),
            ),
          ),
        );
        setCategoryNames(fetchedCategories);
      } catch (error) {
        console.error("Error fetching category names:", error);
      }
    };

    if (categories?.length) {
      fetchCategoryNames();
    }
  }, [categories]);

  const handleDelete = async () => {
    if (
      window.confirm(`Êtes-vous sûr de vouloir supprimer la vidéo "${title}" ?`)
    ) {
      const success = await deleteVideo(id);
      if (success) {
        onDelete(id);
      }
    }
  };
  const thumbnailUrl = getVideasThumbnail(video_url);
  return (
    <div className="video-component-admin">
      <div className="video-card-admin">
        <img className="miniature-pic-admin" src={thumbnailUrl} alt="" />
        <div className="video-card-box">
          <div className="video-card-content">
            <h2 className="video-card-title">{title}</h2>
            <p className="video-card-description">{description}</p>
            <div className="video-card-categories-containter">
              {categoryNames.map((category) => (
                <p key={category.id} className="category-video-admin">
                  {category.name}
                </p>
              ))}
            </div>
            <ul className="video-details">
              <li>{date}</li>
              <li>{duration}</li>
              <li>{`${views} views`}</li>
            </ul>
          </div>
          <div className="video-actions">
            <img
              width={30}
              className="edit"
              src={editPicto}
              alt="Modifier"
              onClick={onEdit}
              onKeyDown={onEdit}
            />
            <img
              width={30}
              className="delete"
              src={deletePicto}
              alt="Supprimer"
              onClick={handleDelete}
              onKeyDown={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
