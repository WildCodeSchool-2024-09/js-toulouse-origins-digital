export const fetchFavorites = async (userId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch favorites");
  const data = await response.json();
  return data.favorites;
};
