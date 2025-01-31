const useDeleteCategory = () => {
  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        },
      );

      return response.status === 204;
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return deleteCategory;
};

export default useDeleteCategory;
