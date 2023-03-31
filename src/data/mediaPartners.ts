import facebook from "../assets/images/media-partners/facebook.webp";
import foursquare from "../assets/images/media-partners/foursquare.webp";
import timesSquareAlliance from "../assets/images/media-partners/times-square-alliance.webp";
import nycTourism from "../assets/images/media-partners/nyc-tourism.jpg";
import sixPlusLogo from "../assets/images/media-partners/six-plus-logo.png";
import vendry from "../assets/images/media-partners/vendry.webp";
import worldBrideMag from "../assets/images/media-partners/world-bride-mag.webp";
import CarouselItem from "../classes/CarouselItem";

export const mediaPartners = [
  new CarouselItem({
    image: facebook,
    alt: "Facebook",
    link: "https://www.facebook.com/manhattanmanor",
  }),
  new CarouselItem({
    image: foursquare,
    alt: "Foursquare",
    link: "https://foursquare.com/v/manhattan-manor/5d84dabce01e0400073b8e46",
  }),
  new CarouselItem({
    image: timesSquareAlliance,
    alt: "Times Square Alliance",
    link: "https://www.timessquarenyc.org/",
  }),
  new CarouselItem({
    image: nycTourism,
    alt: "NYC Tourism",
    link: "https://www.nyctourism.com/rebrand",
  }),
  new CarouselItem({
    image: sixPlusLogo,
    alt: "Six Plus Logo",
    link: "https://www.sixplus.com/",
  }),
  new CarouselItem({
    image: vendry,
    alt: "Vendry",
    link: "https://thevendry.com/venue/93792/manhattan-manor-new-york-ny#!",
  }),
  new CarouselItem({ image: worldBrideMag, alt: "World Bride Magazine" }),
];
