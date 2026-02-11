export type MenuItemType = {
  id: string,
  name: string,
  price: number
  description: string,
}

export type MenuData = { [key: string]: MenuItemType };

export interface MenuDisplayProps {
  menuItems: MenuData | null;
  loading: boolean;
  error: string | null;
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: any) => void;
  updateCartHandler: React.FormEventHandler;
  clearPreCart: () => void;
}

export interface MenuGridProps {
  menuItems: MenuData | null;
  itemAmountsMap: Map<string, number>;
  addToPreCartHandler: (item: any) => void;
}

export interface MenuActionsProps {
  itemCount: number;
  onAddToCart: React.FormEventHandler;
  onClearCart: () => void;
}