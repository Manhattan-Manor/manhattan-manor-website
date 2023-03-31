class CarouselItem {
  image: string;
  alt: string;
  link?: string;

  constructor(item?: CarouselItem) {
    if (item) {
      this.image = item.image;
      this.link = item.link;
      this.alt = item.alt;
    } else {
      this.image = "";
      this.alt = "";
      this.link = "";
    }
  }
}

export default CarouselItem;