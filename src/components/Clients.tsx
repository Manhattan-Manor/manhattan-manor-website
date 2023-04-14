import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "./Carousel";
import Client from "../classes/Client";
import CarouselItem from "../classes/CarouselItem";

const Clients: FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("translation");

  const init = async () => {
    try {
      setIsLoading(true);
      const clients = await Client.getAll();
      const carouselItems: CarouselItem[] = [];
      for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        const carouselItem = await client.toCarouselItem();
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
      <h2 className="text-center mb-3">{t("clients")}</h2>

      {isLoading && <div className="text-center">{t("common.loading")}</div>}
      <div className="row">
        <div className="col-12">
          <Carousel title="Clients Carousel" items={carouselItems} />
        </div>
      </div>
    </section>
  );
};

export default Clients;
