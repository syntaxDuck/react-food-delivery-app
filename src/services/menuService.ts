import { collection, getDocs } from 'firebase/firestore';

import type { MenuItemType } from '../components/layout/menu/types';
import { db } from '../firebase/config';
import { mockMenuItems } from '../mock/data';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function fetchMenuFromFirestore(): Promise<MenuItemType[]> {
  if (USE_MOCK) {
    console.log('Using mock menu data');
    return mockMenuItems;
  }

  const snapshot = await getDocs(collection(db, 'Menu'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as MenuItemType[];
}

export function isUsingMock() {
  return USE_MOCK;
}
