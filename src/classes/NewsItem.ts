import Image from "./Image";
import i18next from "i18next";

class NewsItem {
  title: string;
  summary: string;
  date: string;
  image: Image;
  articleLink: string;
  body: string;

  constructor(item?: NewsItem) {
    if (item) {
      this.title = item.title;
      this.summary = item.summary;
      this.date = item.date;
      this.image = item.image;
      this.articleLink = item.articleLink;
      this.body = item.body;
    } else {
      this.title = "";
      this.summary = "";
      this.date = "";
      this.image = new Image();
      this.articleLink = "";
      this.body = "";
    }
  }

  public static getAll = async (): Promise<NewsItem[]> => {
    const locale = i18next.language;
    const response = await fetch(
      import.meta.env.PUBLIC_CMS_API_ROUTE +
        "/content/items/news?" +
        new URLSearchParams({
          locale,
          sort: JSON.stringify({ date: -1 }),
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.PUBLIC_CMS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data.map((item: NewsItem) => new NewsItem(item));
  };

  public static getAllSpanish = async (): Promise<NewsItem[]> => {
    const response = await fetch(
      import.meta.env.PUBLIC_CMS_API_ROUTE +
        "/content/items/spanishNews?" +
        new URLSearchParams({
          sort: JSON.stringify({ date: -1 }),
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.PUBLIC_CMS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data.map((item: NewsItem) => new NewsItem(item));
  };
}

export default NewsItem;
