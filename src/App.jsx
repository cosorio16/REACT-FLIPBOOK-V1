import { useState, useEffect } from "react";
import "./App.css";
import flipbook from "./assets/data/data.js";
import Sheet from "./assets/components/sheet/Sheet.jsx";
import Nav from "./assets/components/nav/Nav.jsx";
import Header from "./assets/components/header/Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("aerosol");
  const [sheets, setSheets] = useState(
    flipbook.map((f, index) => ({
      id: f.numberSheet,
      isFlipped: false,
      imageFront: f.imageFront,
      imageBack: f.imageBack,
      zValue: flipbook.length - index,
      videoFront: f.videoMediaLinkFront,
      videoBack: f.videoMediaLinkBack,
      producto: f.productsInFront,
      productoBack: f.productsInBack,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateSheets = sheets.map((sheet, index) =>
      sheet.id === currentPage
        ? {
            ...sheet,
            isFlipped: false,
            zValue: flipbook.length - index,
          }
        : sheet
    );

    setSheets(updateSheets);
  }, [currentPage]);

  function prevPage() {
    if (currentPage > 1) {
      const updateSheets = sheets.map((sheet, index) =>
        sheet.id === currentPage
          ? {
              ...sheet,
              isFlipped: false,
              zValue: flipbook.length - index,
            }
          : sheet
      );

      setSheets(updateSheets);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < flipbook.length + 1) {
      const updatedSheets = sheets.map((sheet, index) => ({
        ...sheet,
        isFlipped: index < currentPage,
        zValue: index < currentPage ? index : flipbook.length - index,
      }));

      setSheets(updatedSheets);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handleButtonClick(buttonType) {
    const categoryMap = {
      aerosoles: 1,
      "Artículos de Pintura": 2,
      herramientas: 2,
      "Corte, Pulido y Desbaste": 4,
      medición: 4,
      "Cerrajería y Candados": 5,
      accesorios: 5,
      "Malla Sombra y Sogas": 6,
      "Herramientas Agrícolas": 6,
      "Compresores y Soldadores": 7,
      hidrolavadoras: 8,
      fijación: 8,
    };

    const page = categoryMap[buttonType];

    if (page !== undefined) {
      const updateSheets = sheets.map((sheet, index) => ({
        ...sheet,
        isFlipped: index < page - 1,
        zValue: index < page - 1 ? index : flipbook.length - index,
      }));

      setSheets(updateSheets);
      setCurrentPage(page);
      setActiveSection(buttonType);
    }
  }

  return (
    <>
      {loading && (
        <div className="loader book">
          <figure className="page_loader"></figure>
          <figure className="page_loader"></figure>
          <figure className="page_loader"></figure>
        </div>
      )}
      <div
        className="container_home"
        style={{ opacity: `${loading ? "0" : "1"}` }}
      >
        <>
          <Nav
            handleButtonClick={handleButtonClick}
            activeSection={activeSection}
            currentPage={currentPage}
          ></Nav>
          <div className="container_flipbook">
            <Header></Header>
            <div className="catalogo_passion_ferretera">
              {sheets.map((sheet, index) => (
                <Sheet
                  key={sheet.id}
                  isFlipped={sheet.isFlipped}
                  imageFront={sheet.imageFront}
                  imageBack={sheet.imageBack}
                  zIndex={sheet.zValue}
                  sheetNumber={index + 1}
                  videoMediaLinkFront={sheet.videoFront}
                  videoMediaLinkBack={sheet.videoBack}
                  productInFront={sheet.producto}
                  productInBack={sheet.productoBack}
                  loading={loading}
                  setLoading={setLoading}
                  pageNumber={index}
                ></Sheet>
              ))}

              <div className="buttons_direction_flip">
                <button
                  title="Anterior"
                  className="prev_page"
                  onClick={prevPage}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  title="Siguiente"
                  className="next_page"
                  onClick={nextPage}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default App;
