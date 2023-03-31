import bizbash from "../assets/images/in-the-news/bizbash.webp";
import heightmagazine from "../assets/images/in-the-news/heightmagazine.webp";
import irishecho from "../assets/images/in-the-news/irishecho.webp";
import knot from "../assets/images/in-the-news/knot.webp";
import nycTourism from "../assets/images/in-the-news/nyc-tourism.jpg";
import timessquare from "../assets/images/in-the-news/timessquare.jpeg";
import weddingsalon from "../assets/images/in-the-news/weddingsalon.webp";
import zola from "../assets/images/in-the-news/zola.webp";
import CarouselItem from "../classes/CarouselItem";

export const inTheNews = [
  new CarouselItem({
    image: bizbash,
    alt: "Bizbash",
    link: "https://www.bizbash.com/venue-directory/independent-event-spaces/venue/13389004/manhattan-manor",
  }),
  new CarouselItem({
    image: heightmagazine,
    alt: "Height Magazine",
    link: "https://www.heightmag.com/blog/new-york-fashion-week-at-the-manhattan-manor",
  }),
  new CarouselItem({
    image: irishecho,
    alt: "Irish Echo",
    link: "https://www.prnewswire.com/news-releases/irish-echo-to-hold-annual-law-and-order-awards-301732383.html",
  }),
  new CarouselItem({
    image: knot,
    alt: "The Knot",
    link: "https://www.theknot.com/marketplace/manhattan-manor-new-york-ny-2012844",
  }),
  new CarouselItem({
    image: nycTourism,
    alt: "NYC Tourism",
    link: "https://www.nycgo.com/relaunch",
  }),
  new CarouselItem({
    image: timessquare,
    alt: "Times Square",
    link: "https://www.timessquarenyc.org/locations/manhattan-manor",
  }),
  new CarouselItem({
    image: weddingsalon,
    alt: "Wedding Salon",
    link: "https://weddingsalon.com/2022/11/22/manhattan-manor-2/",
  }),
  new CarouselItem({
    image: zola,
    alt: "Zola",
    link: "https://www.zola.com/wedding-vendors/wedding-venues/manhattan-manor",
  }),
];
