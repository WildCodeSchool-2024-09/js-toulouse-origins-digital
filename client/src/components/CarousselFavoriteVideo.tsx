import "../styles/CarousselFavoriteVideo.css";

export default function CarouselFavoriteVideo() {
  const favorite = [
    {
      id: 1,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 2,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 3,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 4,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 5,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 6,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 7,
      title: "Titre",
      url: "Video Favorite",
    },
    {
      id: 8,
      title: "Titre",
      url: "Video Favorite",
    },
  ];

  return (
    <div className="carousel-favorite-video">
      {favorite.map((item) => (
        <div key={item.id}>
          <div>
            <img src={item.url} alt={item.title} className="favorite-video" />
          </div>
        </div>
      ))}
    </div>
  );
}
