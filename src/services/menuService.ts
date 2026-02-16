import { collection, getDocs } from 'firebase/firestore';

import type { MenuItemType } from '../components/layout/menu/types';
import { db } from '../firebase/config';
import { mockMenuItems } from '../mock/data';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

console.log('USE_MOCK:', USE_MOCK);

export async function fetchMenuFromFirestore(): Promise<MenuItemType[]> {
  if (USE_MOCK) {
    console.log('Using mock menu data');
    return mockMenuItems;
  }

  console.log('Fetching from Firestore, db:', !!db);
  try {
    const snapshot = await getDocs(collection(db, 'Menu'));
    console.log('Firestore snapshot size:', snapshot.size);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as MenuItemType[];
  } catch (error) {
    console.error('Firestore error:', error);
    throw error;
  }
}

export function isUsingMock() {
  return USE_MOCK;
}
