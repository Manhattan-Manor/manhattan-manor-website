import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "./Carousel";
import CarouselItem from "../classes/CarouselItem";
import MediaPartner from "../classes/MediaPartner";

const MediaPartners: FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("translation");

  const init = async () => {
    try {
      setIsLoading(true);
      const partners = await MediaPartner.getAll();
      const carouselItems: CarouselItem[] = [];
      for (let i = 0; i < partners.length; i++) {
        const partner = partners[i];
        const carouselItem = await partner.toCarouselItem();
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
    <section className="container mt-5" id="clients-section">
      <h2 className="text-center mb-3">{t("media-partners")}</h2>

      {isLoading && <div className="text-center">{t("common.loading")}</div>}
      <div className="row">
        <div className="col-12">
          <Carousel title="Media Partners Carousel" items={carouselItems} />
        </div>
      </div>
    </section>
  );
};

export default MediaPartners;
