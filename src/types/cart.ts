// Cart-related type definitions

// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
  description?: string;
  category?: string;
  image?: string;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
  totalAmount: number;
  cartActive: boolean;
}

// Cart action types for reducer
export type CartActionType = 'UPDATE_CART' | 'TOGGLE_CART' | 'CLEAR_CART';

// Cart actions for reducer
export interface CartAction {
  type: CartActionType;
  items?: CartItem[];
}

// Specific cart actions
export interface UpdateCartAction extends CartAction {
  type: 'UPDATE_CART';
  items: CartItem[];
}

export interface ToggleCartAction extends CartAction {
  type: 'TOGGLE_CART';
}

export interface ClearCartAction extends CartAction {
  type: 'CLEAR_CART';
}

// Union type for all cart actions
export type CartActionUnion = UpdateCartAction | ToggleCartAction | ClearCartAction;

// Cart context value interface
export interface CartContextValue {
  state: CartState;
  updateCart: (items: CartItem[]) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

// Cart reducer function type
export type CartReducerFunction = (state: CartState, action: CartActionUnion) => CartState;

// Cart component props
export interface CartProps {
  className?: string;
}

// Cart button props
export interface CartButtonProps {
  className?: string;
  itemCount: number;
  totalAmount: number;
  onClick: () => void;
}

// Cart item props
export interface CartItemProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
  onUpdateAmount: (itemId: string, newAmount: number) => void;
}

// Cart item amount props
export interface CartItemAmountProps {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

// Pre-cart item (for items before being added to main cart)
export interface PreCartItem extends CartItem {
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
  items: CartItem[];
  totalAmount: number;
  userId: string;
  deliveryAddress?: string;
  timestamp: string;
}