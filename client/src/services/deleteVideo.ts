const useDeleteVideo = () => {
  const deleteVideo = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${id}`,
        {
          method: "DELETE",
        },
      );

      return response.status === 204;
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return deleteVideo;
};

export default useDeleteVideo;
