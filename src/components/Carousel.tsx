import type { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CarouselItem from "../classes/CarouselItem";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "../assets/styles/Carousel.scss";

interface ICarouselProps {
  items: CarouselItem[];
  title?: string;
}

const options = {
  perPage: 6,
  gap: "1rem",
  type: "loop",
  drag: "free",
  focus: "center",
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
    576: {
      perPage: 2,
    },
    768: {
      perPage: 3,
    },
    992: {
      perPage: 4,
    },
    1200: {
      perPage: 5,
    },
    1400: {
      perPage: 6,
    },
  },
};

const Carousel: FC<ICarouselProps> = ({ items, title }) => {
  return (
    <Splide
      aria-label={title || "Carousel"}
      options={options}
      extensions={{ AutoScroll }}
    >
      {items.map((item, index) => {
        if (item.link)
          return (
            <SplideSlide key={index}>
              <a href={item.link} rel="noopener noreferrer" target="_blank">
                {/* @ts-ignore */}
                <img src={item.image} alt={`Image ${index + 1}`} />
              </a>
            </SplideSlide>
          );
        return (
          <SplideSlide key={index}>
            {/* @ts-ignore */}
            <img src={item.image} alt={`Image ${index + 1}`} />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Carousel;
