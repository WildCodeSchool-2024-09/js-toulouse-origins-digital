export const fetchFavorites = async (userId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`,
  );
  const data = await response.json();
  return data.favorites;
};
