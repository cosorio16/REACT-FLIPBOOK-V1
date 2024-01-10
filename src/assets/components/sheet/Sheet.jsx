import React from "react";
import { useState, useEffect } from "react";
import "../../styles/Sheet.css";
import {
  faBagShopping,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "../view/View";
import flipbook from "../../data/data";

function Sheet({
  isFlipped,
  zIndex,
  imageFront,
  imageBack,
  rValue,
  videoMediaLinkFront,
  videoMediaLinkBack,
  productInFront,
  productInBack,
  sheetNumber,
  iconoActual,
  setIconoActual,
}) {
  const [showStatusFront, setShowStatusFront] = useState(false);
  const [showStatusBack, setShowStatusBack] = useState(false);

  useEffect(() => {
    setShowStatusFront(showStatusFront);
  }, [showStatusFront]);

  useEffect(() => {
    setShowStatusBack(showStatusBack);
  }, [showStatusBack]);

  return (
    <>
      <View
        showView={showStatusFront}
        setShowView={(showStatus) => setShowStatusFront(showStatus)}
        product={productInFront}
        setIconoActual={setIconoActual} // Pasar la función para actualizar el icono
      />
      <View
        showView={showStatusBack}
        setShowView={(showStatus) => setShowStatusBack(showStatus)}
        product={productInBack}
        setIconoActual={setIconoActual} // Pasar la función para actualizar el icono
      />
      <div
        id={`sheet-${sheetNumber}`}
        className={`sheet ${isFlipped ? "flip" : ""}`}
        style={{ zIndex }}
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
          <button
            onClick={() => {
              setShowStatusFront(!showStatusFront);
              setShowStatusBack(false); // Asegurarse de cerrar el otro panel
              setIconoActual(faBagShopping); // Restablecer el icono al abrir el panel
            }}
            className="product_view"
          >
            <FontAwesomeIcon icon={faBagShopping} title="Cerrar" />
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
          <button
            onClick={() => {
              setShowStatusBack(!showStatusBack);
            }}
            className="product_view"
          >
            <FontAwesomeIcon icon={faBagShopping} title="Ver Productos" />
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
