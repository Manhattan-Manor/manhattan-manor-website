import { FC, useState } from "react";
import "../assets/styles/Venue.scss";

interface IVenueProps {
  name: string;
  mainImage: string;
}

const Venue: FC<IVenueProps> = ({ name, mainImage }) => {
  const [mode, setMode] = useState<"default" | "description">("default");

  return (
    <div className="venue">
      {mode}
      {mode === "default" && (
        <div onClick={() => setMode("description")}>
          <img src={mainImage} alt={name} />
          <div>
            <h5>
              {name} <i className="bi bi-chevron-right"></i>
            </h5>
          </div>
        </div>
      )}
      <div className="buttons">
        <button>
          <i className="bi bi-images"></i> Gallery
        </button>
        <button>
          <i className="bi bi-play-circle"></i> Video
        </button>
        <button>
          <i className="bi bi-map"></i> Floor Plans
        </button>
      </div>
    </div>
  );
};

export default Venue;
