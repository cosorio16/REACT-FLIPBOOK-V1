import React from "react";
import { useState, useEffect } from "react";
import "../../styles/Sheet.css";
import { faBagShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  pageNumber,
}) {
  const [tipoInSheet, setTipoInSheet] = useState("");
  const [showStatusFront, setShowStatusFront] = useState(false);
  const [showStatusBack, setShowStatusBack] = useState(false);

  const tiposFront =
    productInFront.length > 0
      ? productInFront.find((categoria) => categoria.name)?.tipos || []
      : [];

  const optionsInFront =
    tiposFront.find((tipo) => tipo.name === tipoInSheet)?.options || [];

  const tiposBack =
    productInBack.length > 0
      ? productInBack.find((categoria) => categoria.name)?.tipos || []
      : [];

  const optionsInBack =
    tiposBack.find((tipo) => tipo.name === tipoInSheet)?.options || [];

  useEffect(() => {
    setShowStatusFront(showStatusFront);
  }, [showStatusFront]);

  useEffect(() => {
    setShowStatusBack(showStatusBack);
  }, [showStatusBack]);

  return (
    <>
      <>
        <View
          showView={showStatusFront}
          setShowView={(showStatus) => setShowStatusFront(showStatus)}
          product={productInFront}
          tipoSelect={tipoInSheet}
          optionProp={optionsInFront}
        />
        <View
          showView={showStatusBack}
          setShowView={(showStatus) => setShowStatusBack(showStatus)}
          product={productInBack}
          tipoSelect={tipoInSheet}
          optionProp={optionsInBack}
        />
        <div
          id={`sheet-${sheetNumber}`}
          className={`sheet ${isFlipped ? "flip" : ""}`}
          style={{ zIndex }}
        >
          <div
            className={`page front${pageNumber}`}
            style={{
              background: `url(${imageFront})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className={`botones_productos_sheet_front${pageNumber}`}>
              {tiposFront.map((tipo, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowStatusFront(!showStatusFront);
                    setShowStatusBack(false);
                    setTipoInSheet(tipo.name);
                  }}
                  className="product_view"
                >
                  <FontAwesomeIcon icon={faPlus} title="Ver Producto" />
                </button>
              ))}
            </div>

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
            className={`page back back${pageNumber}`}
            style={{
              backgroundImage: `url(${imageBack})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className={`botones_productos_sheet_back${pageNumber}`}>
              {tiposBack.map((tipo, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowStatusBack(!showStatusBack);
                    setShowStatusFront(false);
                    setTipoInSheet(tipo.name);
                  }}
                  className="product_view"
                >
                  <FontAwesomeIcon icon={faBagShopping} title="Ver Productos" />
                </button>
              ))}
            </div>

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
