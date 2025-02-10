const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchFavorites = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/favorites${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.favorites || [];
};
