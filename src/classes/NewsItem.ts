class NewsItem {
  title: string;
  summary: string;
  date: Date;
  image: string;
  articleLink: string;
  html: string;

  constructor(item?: NewsItem) {
    if (item) {
      this.title = item.title;
      this.summary = item.summary;
      this.date = item.date;
      this.image = item.image;
      this.articleLink = item.articleLink;
      this.html = item.html;
    } else {
      this.title = "";
      this.summary = "";
      this.date = new Date();
      this.image = "";
      this.articleLink = "";
      this.html = "";
    }
  }
}

export default NewsItem;