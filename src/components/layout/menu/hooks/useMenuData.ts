import { useMemo, useRef } from "react";

import { FIREBASE_ENDPOINT } from "../../../../App";
import useFetch from "../../../../functions/useFetch";
import type { MenuData } from "../types";

export const useMenuData = () => {
  const dbUrl = useRef<string>(FIREBASE_ENDPOINT + "Menu.json");

  const { data, error, loading } = useFetch(dbUrl.current);

  const menuItems = useMemo(() => {
    const menuItemsMap = data as MenuData | null;
    return menuItemsMap
      ? Object.keys(menuItemsMap)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => ({
          ...menuItemsMap[key],
          name: menuItemsMap[key].name,
          category: menuItemsMap[key].category
        }))
      : [];
  }, [data]);

  return {
    menuItems,
    loading,
    error
  };
};
