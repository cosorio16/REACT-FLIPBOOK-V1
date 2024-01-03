import React from "react";
import "../../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
function Header({ productCant }) {
  return (
    <>
      <div className="header_container">
        <button className="cart_shop">
          <FontAwesomeIcon icon={faCartShopping} />
          
        </button>
        <span className="amount_notification">{productCant}</span>
      </div>
    </>
  );
}

export default Header;
