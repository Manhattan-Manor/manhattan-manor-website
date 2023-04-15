import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "./Carousel";
import CarouselItem from "../classes/CarouselItem";
import PreferredVendor from "../classes/PreferredVendor";

const PreferredVendors: FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("translation");

  const init = async () => {
    try {
      setIsLoading(true);
      const vendors = await PreferredVendor.getAll();
      const carouselItems: CarouselItem[] = [];
      for (let i = 0; i < vendors.length; i++) {
        const vendor = vendors[i];
        const carouselItem = await vendor.toCarouselItem();
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
      <h2 className="text-center mb-3">{t("preferred-vendors")}</h2>

      {isLoading && <div className="text-center">{t("common.loading")}</div>}
      <div className="row">
        <div className="col-12">
          <Carousel title="Preferred Vendors Carousel" items={carouselItems} />
        </div>
      </div>
    </section>
  );
};

export default PreferredVendors;
