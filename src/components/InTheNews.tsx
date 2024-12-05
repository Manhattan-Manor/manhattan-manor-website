import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "./Carousel";
import CarouselItem from "../classes/CarouselItem";
import InTheNewsItem from "../classes/InTheNewsItem";

const InTheNews: FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("translation");

  const init = async () => {
    try {
      setIsLoading(true);
      const items = await InTheNewsItem.getAll();
      const carouselItems: CarouselItem[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const carouselItem = await item.toCarouselItem();
        carouselItems.push(carouselItem);
      }
      setCarouselItems(carouselItems);
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
    <section className="container" id="clients-section">
      <h2 className="text-center mb-3">{t("in-the-news")}</h2>

      {isLoading && <div className="text-center">{t("common.loading")}</div>}
      <div className="row" style={{height: '150px', maxHeight: '200px'}}>
        <div className="col-12">
          <Carousel title="Media Partners Carousel" items={carouselItems} />
        </div>
      </div>
    </section>
  );
};

export default InTheNews;
