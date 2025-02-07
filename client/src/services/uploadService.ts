export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
