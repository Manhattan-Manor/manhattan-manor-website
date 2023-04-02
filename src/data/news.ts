import NewsItem from "../classes/NewsItem";

export const news = [
  new NewsItem({
    title: "NYCgo Relaunch",
    summary: "New NYCgo.com, reimagined to reflect the energy of New York City",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2sKc1NHSptOgQbRBX5mpB5cq4DH40iTxDydxXwgeCE30P0JKIuj4vWmTnjHWdt3qrhazst9aUMBcM96zRT_LXxxWqS_hPgKVmcTmtQpQQb2KAfj6jemxb0gcdahVwPAsGGifHdSj2e7ceeBHsDEq1ZsGa2xNajXGK-dpHxPANvU-L_F7tArKuY3fRHQ/w184-h184/595.jpg",
    articleLink: "https://www.nycgo.com/relaunch",
    date: new Date("2023-03-31T05:30:00.000Z"),
    html: `
    We're excited to share with you the new NYCgo.com, reimagined to reflect the energy of New York City. The site marries 
    beautiful design and timely content with bright imagery and video to capture NYC like never before, showcasing the endless 
    possibilities the five boroughs hold for all visitors. We invite you to see what the City's buzzing about in our New & 
    Trending section.
    <br><br>
    See new site <a href="https://www.nyctourism.com/rebrand">here</a>
    `,
  }),
  // Create 5 dummy items with dummy information
  ...[1, 2, 3, 4, 5].map(
    (i) =>
      new NewsItem({
        title: `News Item ${i}`,
        summary: `News Item ${i} summary`,
        image: `https://picsum.photos/300/300?random=${i}`,
        articleLink: `https://www.nyctourism.com/${i}`,
        date: new Date("2023-03-31T05:30:00.000Z"),
        html: `News Item ${i} content`,
      })
  ),
];
