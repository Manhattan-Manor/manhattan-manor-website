import React, { FC } from "react";
import Item from "../classes/NewsItem";
import "../assets/styles/NewsItem.scss";

interface INewsItemProps {
  item: Item;
}

const NewsItem: FC<INewsItemProps> = ({ item }) => {
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
    }
  };

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
              <img
                className="mx-auto d-block"
                src={item.image}
                width="150"
                alt={item.title}
              />
              <p
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: item.html }}
              ></p>
              <a
                href={item.articleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read full article
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
