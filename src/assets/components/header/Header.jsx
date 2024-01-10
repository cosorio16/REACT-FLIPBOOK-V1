import React, { useState } from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCarrito } from "../carrito/CarritoContext";

function Header() {
  const { state, dispatch } = useCarrito();
  const [showCart, setShowCart] = useState(false);

  const handleEliminarItem = (index) => {
    const item = state.carrito[index];
    dispatch({ type: "ELIMINAR_DEL_CARRITO", payload: item });
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  const generarMensajeParaWhatsApp = () => {
    const mensaje = state.carrito
      .map((item) => {
        return `${item.categoria} - ${item.tipo} - Opción: ${item.opcion} - Cantidad: ${item.cantidad} - Código: ${item.codigo}`;
      })
      .join("\n");

    return encodeURIComponent(mensaje);
  };

  const handlePagarConWhatsApp = () => {
    const mensajeWhatsApp = generarMensajeParaWhatsApp();
    const urlWhatsApp = `https://wa.me/+573206852825?text=${mensajeWhatsApp}`;
    window.open(urlWhatsApp, "_blank");
  };

  return (
    <>
      <div className="header_container">
        <button onClick={handleShowCart} className="cart_shop">
          {showCart ? (
            <FontAwesomeIcon icon={faCircleXmark} title="Cerrar" />
          ) : (
            <FontAwesomeIcon icon={faCartShopping} title="Ver Carrito" />
          )}
        </button>

        {showCart && (
          <div className="containerProducts">
            {state.carrito.length > 0 ? (
              state.carrito.map((item, index) => (
                <div className="product_card_header" key={index}>
                  <p className="categoria_header">
                    <span className="charact_item">Categoría: </span>
                    <span> {item.categoria}</span>
                  </p>
                  <p className="tipo_header">
                    <span className="charact_item">Tipo: </span>
                    <span>{item.tipo}</span>
                  </p>
                  <p className="option_header">
                    <span className="charact_item">Opción:</span>{" "}
                    <span>{item.opcion}</span>
                  </p>
                  <p className="cantidad_header">
                    <span className="charact_item">Cantidad: </span>
                    <span>{item.cantidad}</span>
                  </p>
                  <p className="code_header">
                    <span className="charact_item">Código:</span>{" "}
                    <span>{item.codigo}</span>
                  </p>
                  <button
                    className="delete_button"
                    onClick={() => handleEliminarItem(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            ) : (
              <p className="empty_message">
                Aún no has seleccionado un producto
              </p>
            )}
            {state.carrito.length > 0 && (
              <button
                onClick={handlePagarConWhatsApp}
                className="pay_with_whatsapp"
              >
                Pagar
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
