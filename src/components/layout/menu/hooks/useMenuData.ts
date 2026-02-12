import { useRef } from "react";

import { FIREBASE_ENDPOINT } from "../../../../App";
import useFetch from "../../../../functions/useFetch";
import type { MenuData, MenuItemType } from "../types";

export const useMenuData = () => {
  const dbUrl = useRef<string>(FIREBASE_ENDPOINT + "Menu.json");

  const { data, error, loading } = useFetch(dbUrl.current);
  const menuItemsMap = data as MenuData | null;
  const menuItems: MenuItemType[] = menuItemsMap
    ? Object.keys(menuItemsMap)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => ({
        ...menuItemsMap[key],
        name: menuItemsMap[key].name ?? key,
        category: menuItemsMap[key].category ?? "uncategorized"
      }))
    : [];

  return {
    menuItems,
    loading,
    error
  };
};
