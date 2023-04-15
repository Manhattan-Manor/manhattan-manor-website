import React, { FC, useEffect, useState } from "react";
import Testimonial from "../classes/Testimonial";
import { useTranslation } from "react-i18next";
import "../assets/styles/Testimonials.scss";

const Testimonials: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { t } = useTranslation("translation");

  const init = async () => {
    try {
      setIsLoading(true);
      const testimonials = await Testimonial.getAll();
      setTestimonials(testimonials);
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
    <section className="container" id="testimonials-section">
      <h2 className="text-center mb-3">
        {t("testimonials")}
      </h2>

      {isLoading && <div className="text-center">{t("common.loading")}</div>}
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div
            className="col-md-4 col-sm-6"
            key={testimonial._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <p className="testimonial">
              {testimonial.testimonial}
              <span>{testimonial.name}</span>
              {testimonial.position && <span>{testimonial.position}</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
