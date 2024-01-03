import React from "react";
import "../../styles/Nav.css";

function Nav({ handleButtonClick, opacityNav }) {
  return (
    <>
      <div
        className="catalogo_menu_sections_bar"
        style={{ opacity: opacityNav }}
      >
        <button onClick={() => handleButtonClick(`aerosol`)}>AEROSOLES</button>
        <button onClick={() => handleButtonClick(`pintura`)}>
          ARTICULOS DE PINTURA
        </button>
        <button onClick={() => handleButtonClick(`herramientas`)}>
          HERRAMIENTAS
        </button>
        <button onClick={() => handleButtonClick(`discos`)}>
          CORTE, PULIDO Y DEBASTE
        </button>
        <button onClick={() => handleButtonClick(`medicion`)}>MEDICIÓN</button>
        <button onClick={() => handleButtonClick(`cerrajeria`)}>
          CERRAJERÍA Y CANDADOS
        </button>
        <button onClick={() => handleButtonClick(`accesorios`)}>
          ACCESORIOS
        </button>
        <button onClick={() => handleButtonClick(`malla`)}>
          MALLA SOMBRA Y SOGAS
        </button>
        <button onClick={() => handleButtonClick(`agricola`)}>
          HERRAMIENTAS AGRÍCOLAS
        </button>
        <button onClick={() => handleButtonClick(`compresores`)}>
          COMPRESORES Y SOLDADORES
        </button>
        <button onClick={() => handleButtonClick(`hidrolavadoras`)}>
          HIDROLAVADORAS
        </button>
        <button onClick={() => handleButtonClick(`fijacion`)}>FIJACIÓN</button>
      </div>
    </>
  );
}

export default Nav;
