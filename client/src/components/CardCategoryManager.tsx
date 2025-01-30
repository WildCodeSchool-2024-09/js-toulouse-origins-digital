import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import "../styles/CardCategoryManager.css";

interface CardCategoryManagerProps {
  name: string;
  description: string;
  url_image: string;
}

export default function CardCategoryManager({
  name,
  description,
  url_image,
}: CardCategoryManagerProps) {
  return (
    <div className="category-card">
      <img className="category-avatar" src={url_image} alt="" />
      <div className="category-info">
        <p className="category-title">{name}</p>
        <p className="category-description">{description}</p>
      </div>
      <div className="category-actions">
        <img width={30} className="edit" src={editPicto} alt="" />
        <img width={30} className="delete" src={deletePicto} alt="" />
      </div>
    </div>
  );
}
