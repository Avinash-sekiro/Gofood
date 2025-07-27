import { useReducer, useContext, createContext } from "react";

const CartContext = createContext();
const CartDispatchContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
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
