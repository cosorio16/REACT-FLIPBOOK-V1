import React from "react";
import "../../styles/Sheet.css";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sheet({
  isFlipped,
  zIndex,
  imageFront,
  imageBack,
  rValue,
  videoMediaLinkFront,
  videoMediaLinkBack,
  sheetNumber,
}) {
  return (
    <>
      <div
        className={`sheet ${isFlipped ? "flip" : ""}`}
        style={{ zIndex, right: rValue }}
      >
        <div
          className="page"
          style={{
            background: `url(${imageFront})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <button className="product_view" title="Ver Productos">
            <FontAwesomeIcon icon={faBagShopping} />
          </button>
          {videoMediaLinkFront && (
            <a
              className="videoMedia"
              href={videoMediaLinkFront}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} title="Ver Video" />
            </a>
          )}
        </div>

        <div
          className="page back"
          style={{
            backgroundImage: `url(${imageBack})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <button className="product_view" title="Ver Productos">
            <FontAwesomeIcon icon={faBagShopping} />
          </button>
          {videoMediaLinkBack && (
            <a
              className="videoMedia"
              href={videoMediaLinkBack}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} title="Ver Video" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Sheet;
