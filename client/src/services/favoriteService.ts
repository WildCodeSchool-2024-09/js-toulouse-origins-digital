export const fetchFavorites = async (userId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`,
    { credentials: "include" },
  );
  const data = await response.json();
  return data.favorites;
};
