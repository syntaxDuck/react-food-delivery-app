import type { CartState, CartActionUnion, CartReducerFunction, CartItem } from "../../../types/cart";

export const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
  cartActive: false,
};

const CartReducer: CartReducerFunction = (state, action) => {
  if (action.type === "UPDATE_CART") {
    let updatedItems = [...state.items];

    action.items.forEach((newItem: CartItem) => {
      //Get existing item index and existing object if item exists in cart
      const existingCartItemIndex = updatedItems.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      //If item already exists in cart add items to existing object
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + newItem.amount,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
        //Else push new item into cart
      } else {
        updatedItems.push(newItem);
      }
    });

    //Sum total cart amount
    const totalAmount = updatedItems.reduce((total, item) => {
      return total + item.amount * item.price;
    }, 0);

    return { ...state, items: updatedItems, totalAmount: totalAmount };
  }

  if (action.type === "TOGGLE_CART") {
    const toggleCart = !state.cartActive;
    return { ...state, cartActive: toggleCart };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return defaultCartState;
};

export default CartReducer;
