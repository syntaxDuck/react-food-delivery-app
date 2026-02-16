export interface CartItemType {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface CartState {
  items: CartItemType[];
  totalAmount: number;
  cartActive: boolean;
}

// Cart context value interface
export interface CartContextValue {
  state: CartState;
  updateCart: (items: CartItemType[]) => void;
  removeItem: (itemId: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

// Cart button props
export interface CartButtonProps {
  className?: string;
  itemCount: number;
  totalAmount: number;
  onClick: () => void;
}

// Pre-cart item (for items before being added to main cart)
export interface PreCartItem extends CartItemType {
  temporaryId?: string; // For tracking before adding to main cart
}

// Cart calculation utilities
export interface CartCalculation {
  itemCount: number;
  totalAmount: number;
  subtotal: number;
  tax?: number;
  deliveryFee?: number;
}

// Order submission data
export interface OrderSubmissionData {
  items: CartItemType[];
  totalAmount: number;
  userId: string;
  deliveryAddress?: string;
  timestamp: string;
}

export const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
  cartActive: false,
};

export const UpdateCartAction = (items: CartItemType[]) => ({
  type: "UPDATE_CART" as const,
  items
});

export const ToggleCartAction = () => ({
  type: "TOGGLE_CART" as const
});

export const ClearCartAction = () => ({
  type: "CLEAR_CART" as const
});

export const RemoveItemAction = (itemId: string) => ({
  type: "REMOVE_ITEM" as const,
  itemId
});

export const CartActions = {
  Update: "UPDATE_CART",
  Toggle: "TOGGLE_CART",
  Clear: "CLEAR_CART",
  Remove: "REMOVE_ITEM"
} as const;


export type CartActionUnion =
  | ReturnType<typeof UpdateCartAction>
  | ReturnType<typeof ToggleCartAction>
  | ReturnType<typeof ClearCartAction>
  | ReturnType<typeof RemoveItemAction>;

export type CartReducerFunction = (state: CartState, action: CartActionUnion) => CartState;
