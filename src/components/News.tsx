import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { FC } from "react";
import { news } from "../data/news";
import NewsItem from "./NewsItem";

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
  return (
    <section className="container mt-4">
      <h2 className="text-center">News</h2>

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
