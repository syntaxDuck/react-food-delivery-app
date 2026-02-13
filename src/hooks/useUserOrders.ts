import {
  collection,
  getDocs,
  orderBy,
  query,
  type Timestamp,
  where} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import type { CartItemType } from '../components/cart/CartTypes';
import { db } from '../firebase/config';

export interface Order {
  id: string;
  user_id: string;
  items: CartItemType[];
  created_at: Timestamp | Date;
  status: 'pending' | 'confirmed' | 'delivered';
}

interface UseUserOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export function useUserOrders(userId: string | undefined): UseUserOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const ordersRef = collection(db, 'Orders');
        const q = query(
          ordersRef,
          where('user_id', '==', userId),
          orderBy('created_at', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const ordersData: Order[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];

        setOrders(ordersData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, [userId]);

  return { orders, loading, error };
}
