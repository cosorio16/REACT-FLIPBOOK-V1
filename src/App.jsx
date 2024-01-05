import { useState, useEffect } from "react";
import flipbook from "./assets/data/data.js";
import Sheet from "./assets/components/sheet/Sheet.jsx";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Nav from "./assets/components/nav/Nav.jsx";
import Header from "./assets/components/header/Header.jsx";
import View from "./assets/components/view/View.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const [rValue, setRValue] = useState("calc(0%)");

  useEffect(() => {
    if (currentPage === 1 || currentPage === 0) {
      setRValue("calc(30%)");
    } else {
      setRValue("calc(10%)");
    }
  }, [currentPage]);

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
    }))
  );

  function prevPage() {
    if (currentPage >= 1) {
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
      setCurrentPage(currentPage - 1);
      console.log(updateSheets);
      console.log(currentPage);
    }
  }
  function nextPage() {
    if (currentPage >= 0 && currentPage < flipbook.length + 1) {
      const updateSheets = sheets.map((sheet, index) =>
        sheet.id === currentPage
          ? { ...sheet, isFlipped: true, zValue: index }
          : sheet
      );
      setSheets(updateSheets);
      setCurrentPage(currentPage + 1);
      console.log(updateSheets);
      console.log(currentPage);
    }
  }

  function handleButtonClick(buttonType) {
    const categoryMap = {
      aerosol: 1,
      pintura: 2,
      herramientas: 2,
      discos: 4,
      medicion: 4,
      cerrajeria: 5,
      accesorios: 5,
      malla: 6,
      agricola: 6,
      compresores: 7,
      hidrolavadoras: 8,
      fijacion: 8,
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
    }
  }

  return (
    <>
      <div className="container_home">
        <Nav handleButtonClick={handleButtonClick}></Nav>
        <div className="container_flipbook">
          <Header></Header>
          <div className="catalogo_passion_ferretera">
            <div className="flipbook_items">
              {sheets.map((sheet, index) => (
                <Sheet
                  key={sheet.id}
                  isFlipped={sheet.isFlipped}
                  imageFront={sheet.imageFront}
                  imageBack={sheet.imageBack}
                  zIndex={sheet.zValue}
                  sheetNumber={index + 1}
                  rValue={rValue}
                  videoMediaLinkFront={sheet.videoFront}
                  videoMediaLinkBack={sheet.videoBack}
                  productInFront={sheet.producto}
                ></Sheet>
              ))}
            </div>
            <div className="buttons_direction_flip">
              <button className="prev_page" onClick={prevPage}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button className="next_page" onClick={nextPage}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
