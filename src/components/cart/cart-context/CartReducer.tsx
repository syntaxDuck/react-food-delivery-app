import { CartActions, type CartItemType, type CartReducerFunction, type CartState, defaultCartState } from "../CartTypes";

// const actions = CartActions;

const handleUpdateCart = (state: CartState, items: CartItemType[]): CartState => {
  const updatedItems = [...state.items];

  items.forEach((newItem: CartItemType) => {
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === newItem.id
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem = updatedItems[existingCartItemIndex];
      // Replace existing item with new amount, don't accumulate
      const updatedItem = {
        ...existingCartItem,
        amount: newItem.amount,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push(newItem);
    }
  });

  const totalAmount = updatedItems.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0);

  return { ...state, items: updatedItems, totalAmount };
};

const handleToggleCart = (state: CartState): CartState => {
  const nextActive = !state.cartActive;
  return { ...state, cartActive: nextActive };
};

const handleClearCart = (state: CartState): CartState => {
  return { ...state, items: [], totalAmount: 0 };
};

const handleRemoveItem = (state: CartState, itemId: string): CartState => {
  const updatedItems = state.items.filter(item => item.id !== itemId);
  const totalAmount = updatedItems.reduce((total, item) => {
    return total + item.amount * item.price;
  }, 0);
  return { ...state, items: updatedItems, totalAmount };
};

const CartReducer: CartReducerFunction = (state, action) => {
  switch (action.type) {
    case CartActions.Update:
      return handleUpdateCart(state, action.items);
    case CartActions.Toggle:
      return handleToggleCart(state);
    case CartActions.Clear:
      return handleClearCart(state);
    case CartActions.Remove:
      return handleRemoveItem(state, action.itemId);
    default:
      return defaultCartState;
  }

};

export default CartReducer;
