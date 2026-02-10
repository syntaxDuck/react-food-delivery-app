// Core type definitions for the application

// Reusable component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form event handlers
export type FormEventHandler = (event: React.FormEvent) => void;
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type ClickEventHandler = (event: React.MouseEvent) => void;

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
  success: boolean;
}

// Error handling
export interface AppError {
  message: string;
  code?: string | number;
  details?: unknown;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Generic fetch hook return type
export interface FetchResult<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// User interface
export interface User {
  id: string;
  email: string;
  username: string;
  token?: string;
}

// Menu item interface
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;