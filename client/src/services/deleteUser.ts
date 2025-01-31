const useDeleteUser = () => {
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        },
      );

      return response.status === 204;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return deleteUser;
};

export default useDeleteUser;
