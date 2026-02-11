import { type CartState, type CartItemType } from "../CartTypes";

export const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
  cartActive: false,
};

const CartActions = {
  Update: "UPDATE_CART",
  Toggle: "TOGGLE_CART",
  Clear: "CLEAR_CART"
} as const;

export const updateCart = (items: CartItemType[]) => ({
  type: "UPDATE_CART" as const,
  items
});

export const toggleCart = () => ({
  type: "TOGGLE_CART" as const
});

export const clearCart = () => ({
  type: "CLEAR_CART" as const
});

type CartActionUnion =
  | ReturnType<typeof updateCart>
  | ReturnType<typeof toggleCart>
  | ReturnType<typeof clearCart>;

export type CartReducerFunction = (state: CartState, action: CartActionUnion) => CartState;


const handleUpdateCart = (state: CartState, items: CartItemType[]) => {
  let updatedItems = [...state.items];

  items.forEach((newItem: CartItemType) => {
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === newItem.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + newItem.amount,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push(newItem);
    }
  });

  const totalAmount = updatedItems.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0);

  return { ...state, items: updatedItems, totalAmount: totalAmount };
}

const handleToggleCart = (state: CartState) => {
  const toggleCart = !state.cartActive;
  return { ...state, cartActive: toggleCart };
}

const handleClearCart = (state: CartState) => {
  return { ...state, items: [] };
}

const CartReducer: CartReducerFunction = (state, action) => {
  switch (action.type) {
    case CartActions.Update:
      return handleUpdateCart(state, action.items);
    case CartActions.Toggle:
      return handleToggleCart(state);
    case CartActions.Clear:
      return handleClearCart(state);
    default:
      return defaultCartState;
  }

};

export default CartReducer;
