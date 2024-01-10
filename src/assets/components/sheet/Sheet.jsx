import React from "react";
import { useState, useEffect } from "react";
import "../../styles/Sheet.css";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "../view/View";

function Sheet({
  isFlipped,
  zIndex,
  imageFront,
  imageBack,
  videoMediaLinkFront,
  videoMediaLinkBack,
  productInFront,
  productInBack,
  sheetNumber,
}) {
  const [loading, setLoading] = useState(true);
  const [showStatusFront, setShowStatusFront] = useState(false);
  const [showStatusBack, setShowStatusBack] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowStatusFront(showStatusFront);
  }, [showStatusFront]);

  useEffect(() => {
    setShowStatusBack(showStatusBack);
  }, [showStatusBack]);

  return (
    <>
      {loading && (
        <div class="loader book">
          <figure class="page_loader"></figure>
          <figure class="page_loader"></figure>
          <figure class="page_loader"></figure>
        </div>
      )}
      <>
        <View
          showView={showStatusFront}
          setShowView={(showStatus) => setShowStatusFront(showStatus)}
          product={productInFront}
        />
        <View
          showView={showStatusBack}
          setShowView={(showStatus) => setShowStatusBack(showStatus)}
          product={productInBack}
        />
        <div
          id={`sheet-${sheetNumber}`}
          className={`sheet ${isFlipped ? "flip" : ""}`}
          style={{ zIndex, opacity: `${loading ? "0" : "1"}` }}
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
    </>
  );
}

export default Sheet;
