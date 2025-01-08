import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/CarouselPrimary.css";

const data = [
  {
    id: 1,
    title: "CATÉGORIE 1",
    text: "Gameplay, astuces et guides pour maîtriser League of Legends. Progressez sur la faille de l’invocateur !",
    url: "https://s3-alpha-sig.figma.com/img/1e02/d7be/7e689ebb847d97473e737707d224852b?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p4-ovuqdlbmP3QDagxe8I-iCepNQttGcgalxAVlqjWyMwRO6~FdhyMh-kDIc8Z0Ldy3E-9iGXFq1qIl91Ovy5zNRW4XTdZYMWB9WMjMt4JGxVB3vaGFVmt6HSUo4FCHDsVYG~tCUOKSCfzE6YoZ3FQhPiSAFHSPYgpQ7n5-3zt1Vg4QLLHJb-6PSWHYJ6IorF5BriKXP1N5~RafE5U8JdFc10hj-cs-Hpdq8ONYZDnD-PZTb~wTKvxVyYWwmVJvfTBGPBnGarxAov9qXFD1xzIIyCiG2XYI5sfuf~-px4c2FAKk8lVvZiT408ri9sv1UP2o3oCc5fmFZ99q3gp5rfQ__",
  },
  {
    id: 2,
    title: "CATÉGORIE 2",
    text: "Gameplay, astuces et guides pour maîtriser League of Legends. Progressez sur la faille de l’invocateur !",
    url: "https://s3-alpha-sig.figma.com/img/843a/303a/8027290984f90a732e4dedf7ec025045?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M1JMTbtFa67e68VkIQPckBDwigpgEtngsBpxIKUBo5tJvNfxHxKWAjrcr4~T99t84ilBVBE4yMFd1hNrjxpqobxm0s9QXNS8ZNZFgCUvdXbDmaJ1CELsj7gd3vyAR9xiX~BBBhd5MqGEXfzpQVXzdrXc2iUNoUyWYimoxXi7IscyzzCxyJ3PH2LoJTtZGOz-5vWW8b~2jpdKt3jlkNC8ihmVj2TumEMqUFJF2xOAq1-A6l2VH9GuxjBEhxfxlAwIhqoQ87C5gVHqZf5mJ2VTmK2KLrsmVcRibm1PUvMR0uAXLCRVWhvHAgbwXvuqxBls~63f5ShwVwfVIvrrztm8Lg__",
  },
  {
    id: 3,
    title: "CATÉGORIE 3",
    text: "Gameplay, astuces et guides pour maîtriser League of Legends. Progressez sur la faille de l’invocateur !",
    url: "https://s3-alpha-sig.figma.com/img/55dd/5be3/89f98c3f5efcd66559ac38574f9017aa?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A1ejbXQ9xihbFmc2-fq6-AgTCI7NZrvflOf2rjDoXsqGNz~LEZx8tHPRYC~ivHNpr7Z-oXwQ3p~DwTCldLIYeqTQg4M1XG8LAhW-eNXiPHDMwOeeZ5ffhBeqJuIv5jdxEQcnTNdjIQRWSvn2xY-MSVWomZyKr08EHaETPTuaYZyC7NHuzwqBEPRVYezv1nH5r-Qj0zqDUNtm2hHTweO5hkoc3cmCRAuK~g8MYGCqdM~M27U7NjobNPggw1VHzODVqPWP9ZcVe~oALsJ7I2ntcEDNL6ataQyA52BYHvgx9qAydjJzd7cHxlOFVEeNkyjl-eCGxrseaaXQbwEhvfo7JQ__",
  },
  {
    id: 4,
    url: "https://s3-alpha-sig.figma.com/img/6131/86e5/cdb145978449c63911259d5628745345?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QyxUowoWodsw2DWjYG4PXtrevcpC72j24gIP05e7yAadwT1Oqik5KafzbLa6BBSU6c2GX2uhrjOTr1x5coomwxVUv~1xrjJ5m8EJC3adALsX7wdJM8llnPGSp-WaLtVNYnIqMyLo5F1wK3K8~x9ZB1s9OennGO4yDDA0MukssnugtuFno5KNQClNYaJ7~QdWM-Y8Ijv~WE9gXhfgS0zrvIjqR9tUY0kDEXFsmsFrRtBbk48h8ihldnY~hkD1XczPojXsDA8uAuHVEt5d2~WNzL4-m22cT0-EPoZUIViCEvL~erGXnTSNck1pNY3lTLttFixfpGuJkc0Zl2hfsX3IAQ__",
  },
];

export default function CarouselVideoPage() {
  return (
    <>
      <Carousel transitionTime={5} infiniteLoop={true}>
        {data.map((item) => (
          <div key={item.id}>
            <div className="picture-border">
              <img src={item.url} alt={item.title} className="image-items" />
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
