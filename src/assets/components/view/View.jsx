import React, { useState, useEffect } from "react";
import "../../styles/View.css";
import { useCarrito } from "../carrito/CarritoContext";

function View({ product, showView, setShowView, setIconoActual }) {
  const { dispatch } = useCarrito();
  const [show, setShow] = useState(showView);
  const [cantidad, setCantidad] = useState(1);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const categorias = product.map((categoria) => categoria.name);
  const descriptions = product.map((description) => description.description);
  const tipos =
    product.length > 0
      ? product.find((categoria) => categoria.name)?.tipos || []
      : [];
  const options =
    (tipoSeleccionado &&
      tipos.find((tipo) => tipo.name === tipoSeleccionado)?.options) ||
    [];
  const code =
    opcionSeleccionada &&
    options.find((option) => option.value === opcionSeleccionada)?.code;

  const handleTipoChange = (e) => {
    setTipoSeleccionado(e.target.value);
    setOpcionSeleccionada("");
  };

  const handleOpcionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const handleAgregarAlCarrito = () => {
    const newItem = {
      categoria: categorias[0], // Accedemos al primer elemento del array
      tipo: tipoSeleccionado,
      opcion: opcionSeleccionada,
      cantidad: parseInt(cantidad, 10),
      codigo: code,
    };

    dispatch({ type: "AGREGAR_AL_CARRITO", payload: newItem });

    setOpcionSeleccionada("");
    setCantidad(1);
    setTipoSeleccionado("");
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
              src="../../../public/images/masso.webp"
              alt="masso_logo"
              className="image_masso"
            />
            <div className="title_code_product">
              {categorias.map((categoria, index) => (
                <h1 key={index} value={categoria}>
                  {categoria}
                </h1>
              ))}

              <p className="code_product">Codigo: {code}</p>
              <div className="form_container">
                <form>
                  <label htmlFor="tipo">Seleccionar tipo:</label>
                  <select
                    id="tipo"
                    onChange={handleTipoChange}
                    value={tipoSeleccionado}
                  >
                    <>
                      <option value="">Seleccione un tipo</option>
                      {tipos.map((tipo, index) => (
                        <option key={index} value={tipo.name}>
                          {tipo.name}
                        </option>
                      ))}
                    </>
                  </select>

                  <label htmlFor="opcion">Seleccionar opción:</label>
                  <select
                    id="opcion"
                    onChange={handleOpcionChange}
                    value={opcionSeleccionada}
                  >
                    {tipoSeleccionado && (
                      <>
                        <option value="">Seleccione una opción</option>
                        {options.map((opcion, index) => (
                          <option key={index} value={opcion.value}>
                            {opcion.value}
                          </option>
                        ))}
                      </>
                    )}
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
                  <p>{cantidad}</p>
                  <button
                    className="minus_amount"
                    onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="button_cart_container">
                  {tipoSeleccionado && (
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
              onClick={() => {
                setShowView(false);
              }}
              className="close_view"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
