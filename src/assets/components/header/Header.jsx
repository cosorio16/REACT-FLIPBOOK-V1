import React, { useState } from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleXmark,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useCarrito } from "../carrito/CarritoContext";
import XLSX from "xlsx";

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

  const generarEnlaceDescarga = () => {
    const data = [["Categoría", "Tipo", "Opción", "Cantidad", "Código"]];

    state.carrito.forEach((item) => {
      const rowData = [
        item.categoria,
        item.tipo,
        item.opcion,
        item.cantidad,
        item.codigo,
      ];
      data.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Carrito");

    const blob = new Blob(
      [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const url = URL.createObjectURL(blob);
    return url;
  };

  const handleDescargarCarrito = () => {
    const urlDescarga = generarEnlaceDescarga();
    const a = document.createElement("a");
    a.href = urlDescarga;
    a.download = "Carrito.xlsx";
    a.click();
  };

  const handlePagarConWhatsApp = () => {
    const mensajeWhatsApp =
      "Bienvenido a Pasion Ferretera, adjunta el excel con tus productos.";
    const urlWhatsApp = `https://wa.me/xxxxxxxxx?text=${mensajeWhatsApp}`;
    window.open(urlWhatsApp, "_blank");
  };

  return (
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
                  <FontAwesomeIcon icon={faTrash} />
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
              onClick={() => {
                handleDescargarCarrito();
                
              }}
              className="pay_with_whatsapp"
            >
              Pagar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
