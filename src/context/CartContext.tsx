import { useState, createContext } from "react";

interface ICartContext {
  trigger: boolean;
  toggleTrigger?: () => void;
}

const defaultState = {
  trigger: false,
};

const CartContext = createContext<ICartContext>(defaultState);
const CartProvider = ({ children }: any) => {
  const [trigger, setTrigger] = useState(false);

  const toggleTrigger = () => {
    setTrigger(!trigger);
  };

  return (
    <CartContext.Provider
      value={{
        trigger,
        toggleTrigger,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
