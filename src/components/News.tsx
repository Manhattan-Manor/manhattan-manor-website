import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { FC, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";
import NewsItemClass from "../classes/NewsItem";

const carouselOptions = {
  perPage: 3,
  gap: "1rem",
  arrows: false,
  breakpoints: {
    576: {
      perPage: 1,
    },
    768: {
      perPage: 2,
    },
    992: {
      perPage: 3,
    },
  },
};

const News: FC = () => {
  const { t } = useTranslation("translation");
  const [news, setNews] = useState<NewsItemClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    try {
      setIsLoading(true);
      const news = await NewsItemClass.getAll();
      setNews(news);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <section className="container mt-4" id="news-section">
      <h2 className="text-center">{t("common.news")}</h2>

      {isLoading && <p>{t("common.loading")}</p>}
      <Splide aria-label="News Carousel" options={carouselOptions}>
        {news.map((item, index) => (
          <SplideSlide key={index}>
            <NewsItem item={item} />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default News;
