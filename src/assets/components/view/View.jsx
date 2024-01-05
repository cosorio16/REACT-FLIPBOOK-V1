import React, { useState } from "react";

function View({product}) {
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const categorias = product.map((categoria) => categoria.name);

  const tipos = product.find(
    (categoria) => categoria.name === categoriaSeleccionada
  )?.tipos;

  const options =
    tipoSeleccionado &&
    tipos.find((tipo) => tipo.name === tipoSeleccionado)?.options;

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    setTipoSeleccionado("");
    setOpcionSeleccionada("");
  };

  const handleTipoChange = (e) => {
    setTipoSeleccionado(e.target.value);
    setOpcionSeleccionada("");
  };

  const handleOpcionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="categoria">Seleccionar producto:</label>
        <select
          id="categoria"
          onChange={handleCategoriaChange}
          value={categoriaSeleccionada}
        >
          <option value="">Seleccione un producto</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        {categoriaSeleccionada && (
          <>
            <label htmlFor="tipo">Seleccionar tipo:</label>
            <select
              id="tipo"
              onChange={handleTipoChange}
              value={tipoSeleccionado}
            >
              <option value="">Seleccione un tipo</option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo.name}>
                  {tipo.name}
                </option>
              ))}
            </select>
          </>
        )}

        {tipoSeleccionado && (
          <>
            <label htmlFor="opcion">Seleccionar opción:</label>
            <select
              id="opcion"
              onChange={handleOpcionChange}
              value={opcionSeleccionada}
            >
              <option value="">Seleccione una opción</option>
              {options.map((opcion, index) => (
                <option key={index} value={opcion.value}>
                  {opcion.value}
                </option>
              ))}
            </select>
          </>
        )}
        {opcionSeleccionada && <button>Agregar al Carrito</button>}
      </form>
    </div>
  );
}

export default View;
