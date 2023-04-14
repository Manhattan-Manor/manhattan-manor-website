import i18next from "i18next";
import CarouselItem from "./CarouselItem";
import Image from "./Image";

class InTheNewsItem {
  image: Image;
  name: string;
  link?: string;

  constructor(item?: InTheNewsItem) {
    if (item) {
      this.image = new Image(item.image);
      this.link = item.link;
      this.name = item.name;
    } else {
      this.image = new Image();
      this.name = "";
      this.link = "";
    }
  }

  public static getAll = async (): Promise<InTheNewsItem[]> => {
    const locale = i18next.language;
    const response = await fetch(
      import.meta.env.PUBLIC_CMS_API_ROUTE +
        "/content/items/inTheNews?locale=" +
        locale,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.PUBLIC_CMS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data.map((item: InTheNewsItem) => new InTheNewsItem(item));
  };

  toCarouselItem = async () => {
    const imageUrl = await this.image.createObjectURL({
      width: 150,
      height: 150,
      mime: "webp",
      resizeMode: "thumbnail",
      quality: 80,
    });

    const item = new CarouselItem({
      image: imageUrl,
      link: this.link,
      alt: this.name,
    });

    return item;
  };
}

export default InTheNewsItem;
