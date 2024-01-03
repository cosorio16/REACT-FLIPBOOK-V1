import React, { useEffect, useState } from "react";
import "../../styles/View.css";

function View({product}) {
  return (
    <>
      <div className="container_view">
        <h2>{viewTitle}</h2>
        <p>{viewDescription}</p>
        <div className="configure_cant">
          <button className="minus_button">-</button>
          <p className="amount">{amount}</p>
          <button className="plus_button">+</button>
        </div>

        <form action="">
          <select name="opciones" id="opciones">
            <option value="">{options}</option>
          </select>
          <input type="submit" value="Enviar" />
        </form>
        <button className="add_to_cart">Agregar al carrito</button>
      </div>
    </>
  );
}

export default View;
