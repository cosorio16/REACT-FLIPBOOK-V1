import React, { createContext, useContext, useReducer } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const initialState = {
    carrito: [],
  };

  const carritoReducer = (state, action) => {
    switch (action.type) {
      case "AGREGAR_AL_CARRITO":
        const updatedCarrito = actualizarCarrito(state.carrito, action.payload);
  
        return {
          ...state,
          carrito: updatedCarrito,
        };
  
      case "ELIMINAR_DEL_CARRITO":
        return {
          ...state,
          carrito: state.carrito.filter(
            (item) => !isEqualItem(item, action.payload)
          ),
        };
  
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(carritoReducer, initialState);

  return (
    <CarritoContext.Provider value={{ state, dispatch }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }

  return context;
};

function actualizarCarrito(carrito, newItem) {
  const existingItemIndex = carrito.findIndex((item) =>
    isEqualItem(item, newItem)
  );

  if (existingItemIndex !== -1) {
    const updatedCarrito = [...carrito];
    updatedCarrito[existingItemIndex].cantidad = newItem.cantidad;
    return updatedCarrito;
  } else {
    return [...carrito, { ...newItem }];
  }
}

function isEqualItem(itemA, itemB) {
  return (
    itemA.categoria === itemB.categoria &&
    itemA.tipo === itemB.tipo &&
    itemA.opcion === itemB.opcion
  );
}
