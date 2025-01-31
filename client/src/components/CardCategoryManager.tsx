import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import useDeleteCategory from "../services/deleteCategory";
import "../styles/CardCategoryManager.css";

interface CardCategoryManagerProps {
  id: number;
  name: string;
  description: string;
  url_image: string;
  onEdit: () => void;
  onDelete: (deletedId: number) => void;
}

export default function CardCategoryManager({
  id,
  name,
  description,
  url_image,
  onEdit,
  onDelete,
}: CardCategoryManagerProps) {
  const deleteCategory = useDeleteCategory();
  const handleDelete = async () => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la catégorie "${name}" ?`,
      )
    ) {
      const success = await deleteCategory(id);
      if (success) {
        onDelete(id);
      }
    }
  };

  return (
    <div className="category-card">
      <img className="category-avatar" src={url_image} alt="" />
      <div className="category-info">
        <p className="category-title">{name}</p>
        <p className="category-description">{description}</p>
      </div>
      <div className="category-actions">
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
  );
}
