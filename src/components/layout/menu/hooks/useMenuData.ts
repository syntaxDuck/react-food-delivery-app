import { useRef } from "react";
import useFetch from "../../../../functions/useFetch";
import { FIREBASE_ENDPOINT } from "../../../../App";
import type { MenuData } from "../types";

export const useMenuData = () => {
  const dbUrl = useRef<string>(FIREBASE_ENDPOINT + "Menu.json");

  const { data, error, loading } = useFetch(dbUrl.current);
  const menuItems = data as MenuData;

  return {
    menuItems,
    loading,
    error,
    data
  };
};