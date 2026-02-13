import { useQuery } from '@tanstack/react-query';

import type { MenuItemType } from '../components/layout/menu/types';
import { fetchMenuFromFirestore } from '../services/menuService';

async function fetchMenu(): Promise<MenuItemType[]> {
  const items = await fetchMenuFromFirestore();
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function useMenuData() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  });
}
