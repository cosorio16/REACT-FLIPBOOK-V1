import React, { useState } from "react";
import "../../styles/Nav.css";

function Nav({ handleButtonClick, activeSection, currentPage }) {
  const sections = [
    "aerosoles",
    "Artículos de Pintura",
    "herramientas",
    "Corte, Pulido y Desbaste",
    "medición",
    "Cerrajería y Candados",
    "accesorios",
    "Malla Sombra y Sogas",
    "Herramientas Agrícolas",
    "Compresores y Soldadores",
    "hidrolavadoras",
    "fijación",
  ];

  const categoryMap = {
    aerosoles: 1,
    "Artículos de Pintura": 2,
    herramientas: 2,
    "Corte, Pulido y Desbaste": 4,
    "medición": 4,
    "Cerrajería y Candados": 5,
    accesorios: 5,
    "Malla Sombra y Sogas": 6,
    "Herramientas Agrícolas": 6,
    "Compresores y Soldadores": 7,
    hidrolavadoras: 8,
    "fijación": 8,
  };

  const handleButtonClickWithActive = (section) => {
    handleButtonClick(section);
  };

  return (
    <>
      <div className="catalogo_menu_sections_bar">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleButtonClickWithActive(section)}
            className={currentPage === categoryMap[section] ? "active" : ""}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

export default Nav;
