import type { CartItemType } from "../../cart/CartTypes";

export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description: string;
}

export type MenuData = Record<string, MenuItemType>;

export interface MenuDisplayProps {
  menuItems: MenuData | null;
  loading: boolean;
  error: string | null;
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: CartItemType) => void;
  updateCartHandler: React.EventHandler<React.SyntheticEvent<HTMLFormElement>>;
  clearPreCart: () => void;
}

export interface MenuGridProps {
  menuItems: MenuData | null;
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: CartItemType) => void;
}

export interface MenuActionsProps {
  itemCount: number;
  onAddToCart: React.MouseEventHandler<HTMLFormElement>;
  onClearCart: () => void;
}
