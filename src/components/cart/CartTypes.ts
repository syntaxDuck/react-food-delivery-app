export interface CartItemType {
  id: string;
  name: string;
  price: number;
  amount: number;
  description?: string;
  category?: string;
  image?: string;
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
