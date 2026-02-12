import type { CartItemType } from "../../cart/CartTypes";

export interface MenuItemType {
  id: string;
  name?: string;
  price: number;
  description: string;
  category?: string;
}

export type MenuData = Record<string, MenuItemType>;

export interface MenuDisplayProps {
  menuItems: MenuItemType[];
  loading: boolean;
  error: string | null;
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: CartItemType) => void;
  updateCartHandler: React.EventHandler<React.SyntheticEvent<HTMLFormElement>>;
  clearPreCart: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface MenuGridProps {
  menuItems: MenuItemType[];
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: CartItemType) => void;
}

export interface MenuActionsProps {
  itemCount: number;
  onAddToCart: React.MouseEventHandler<HTMLFormElement>;
  onClearCart: () => void;
}

export interface MenuPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
