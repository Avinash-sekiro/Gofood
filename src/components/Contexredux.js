import { useReducer, useContext, createContext } from "react";

const CartContext = createContext();
const CartDispatchContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find((item) => item.id === action.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty + action.qty }
            : item
        );
      }
      return [...state, { ...action, qty: action.qty || 1 }]; // Set default qty to 1
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_CART_ITEM':
      return state.map((item) =>
        item.id === action.id ? { ...item, ...action.data } : item
      );
    default:
      console.error(`Invalid action type: ${action.type}`);
      return state;
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>
        {children}
      </CartContext.Provider>
    </CartDispatchContext.Provider>
  );
}

// Custom hooks to access the Cart and Dispatch
export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
