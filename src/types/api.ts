// API-related type definitions

// Firebase Authentication API types
export interface FirebaseAuthRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface FirebaseAuthError {
  error: {
    code: number;
    message: string;
    errors: Array<{
      message: string;
      domain: string;
      reason: string;
    }>;
  };
}

// Firebase REST API response wrapper
export interface FirebaseResponse<T = unknown> {
  data?: T;
  error?: FirebaseAuthError;
  status: number;
  success: boolean;
}

// Firebase database types for menu and orders
export interface FirebaseMenuItem {
  id?: string; // Firebase auto-generated ID
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
}

export interface FirebaseOrder {
  id?: string; // Firebase auto-generated ID
  userId: string;
  items: FirebaseOrderItem[];
  totalAmount: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
}

export interface FirebaseOrderItem {
  id: string;
  name: string;
  price: number;
  amount: number;
}

// HTTP request configuration
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

// API endpoint URLs
export interface ApiEndpoints {
  signUp: string;
  signIn: string;
  menu: string;
  orders: string;
}

// Generic fetch hook parameters
export interface UseFetchParams<T = unknown> extends RequestConfig {
  url: string;
  enabled?: boolean; // For conditional fetching
}

// API Error types
export interface ApiError {
  message: string;
  code: string;
  status?: number;
}

// Success response wrapper
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

// Error response wrapper
export interface ErrorResponse {
  success: false;
  error: ApiError;
  message?: string;
}

// Union type for all API responses
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;