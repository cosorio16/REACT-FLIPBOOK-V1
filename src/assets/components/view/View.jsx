import React, { useState, useEffect } from "react";
import "../../styles/View.css";
import { useCarrito } from "../carrito/CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function View({ product, showView, setShowView, tipoSelect, optionProp }) {
  const { dispatch } = useCarrito();
  const [show, setShow] = useState(showView);
  const [cantidad, setCantidad] = useState(1);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const categorias = product.map((categoria) => categoria.name);
  const descriptions = product.map((description) => description.description);

  const code = optionProp.find(
    (option) => option.value === opcionSeleccionada
  )?.code;

  const handleOpcionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);

    if (!isNaN(value) && (value === "" || value >= 1)) {
      setCantidad(value);
    }
  };

  const handleAgregarAlCarrito = () => {
    const newItem = {
      categoria: categorias[0],
      tipo: tipoSelect,
      opcion: opcionSeleccionada,
      cantidad: parseInt(cantidad, 10),
      codigo: code,
    };

    dispatch({ type: "AGREGAR_AL_CARRITO", payload: newItem });

    setOpcionSeleccionada("");
    setCantidad(1);
  };

  useEffect(() => {
    setShow(showView);
  }, [showView]);

  return (
    <>
      {show && (
        <div className={"view_container_product"}>
          <div className="characts_container">
            <img
              src="./images/masso.webp"
              alt="masso_logo"
              className="image_masso"
            />
            <div className="title_code_product">
              {categorias.map((categoria, index) => (
                <h1 key={index} value={categoria}>
                  {categoria}
                </h1>
              ))}
              <h1>{tipoSelect}</h1>

              <p className="code_product">Codigo: {code}</p>
              <div className="form_container">
                <form>
                  <label htmlFor="opcion">Seleccionar opción:</label>
                  <select
                    id="opcion"
                    onChange={handleOpcionChange}
                    value={opcionSeleccionada}
                  >
                    <>
                      <option value="">Seleccione una opción</option>
                      {optionProp.map((opcion, index) => (
                        <option key={index} value={opcion.value}>
                          {opcion.value}
                        </option>
                      ))}
                    </>
                  </select>
                </form>
              </div>
              <div className="amount_container">
                <div className="amount_set_buttons">
                  <button
                    className="plus_amount"
                    onClick={() => setCantidad(cantidad + 1)}
                  >
                    Agregar
                  </button>
                  <input
                    type="text"
                    value={cantidad}
                    onChange={handleInputChange}
                    onBlur={() => {
                      const value =
                        cantidad === "" ? "" : parseInt(cantidad, 10);

                      if (isNaN(value) || value < 1) {
                        setCantidad(1);
                      }
                    }}
                  />
                  <button
                    className="minus_amount"
                    onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="button_cart_container">
                  {opcionSeleccionada && (
                    <button
                      onClick={handleAgregarAlCarrito}
                      className="add_to_cart"
                    >
                      Agregar Al Carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="description_container">
            <p className="title_description">Descripción: </p>

            {descriptions.map((description, index) => (
              <p className="description_text" key={index}>
                {description}
              </p>
            ))}

            <button
              title="Cerrar"
              onClick={() => {
                setShowView(false);
              }}
              className="close_view"
            >
              <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
