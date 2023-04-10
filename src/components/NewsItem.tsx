import React, { FC, useEffect, useState } from "react";
import Item from "../classes/NewsItem";
import "../assets/styles/NewsItem.scss";
import Image from "../classes/Image";
import { useTranslation } from "react-i18next";

interface INewsItemProps {
  item: Item;
}

const NewsItem: FC<INewsItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const { t } = useTranslation("translation");

  const modalRef = React.useRef<HTMLDivElement>(null);
  const dateString = new Date(item.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const openModal = () => {
    const modal = modalRef.current;
    if (modal) {
      document.body.appendChild(modal);
      // @ts-ignore
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
      setIsOpen(true);

      modal.addEventListener("hidden.bs.modal", () => {
        setIsOpen(false);
      });
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const image = new Image(item.image);
      const imagePath = await image.createObjectURL({
        height: 200,
        mime: "webp",
        resizeMode: "fitToWidth",
        quality: 80,
      });
      setImagePath(imagePath);
    };
    if (isOpen) {
      getImage();
    }
  }, [isOpen]);

  return (
    <>
      <article onClick={openModal} className="news-item">
        <div>
          <h5>{item.title}</h5>
          <p>{item.summary}</p>
        </div>

        <hr />
        {/* Set date in format MM DD, HH:mm a */}
        <p className="news-item__date">{dateString}</p>
      </article>

      {/* Modal */}
      <div
        className="modal fade"
        tabIndex={-1}
        aria-labelledby={item.title}
        aria-hidden="true"
        ref={modalRef}
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <span className="date">{dateString}</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>

              <hr />
              {imagePath && (
                <img
                  className="mx-auto d-block"
                  src={imagePath}
                  height={200}
                  alt={item.title}
                />
              )}
              <p
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: item.body }}
              ></p>
              <a
                href={item.articleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("common.read-full-article")}
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
