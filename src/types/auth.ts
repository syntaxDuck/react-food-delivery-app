// Authentication-related type definitions

// User authentication states
export type AuthState = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

// User action types for login/register
export type UserAction = 'SignIn' | 'SignUp';

// Form validation states
export type ValidationState = 'valid' | 'invalid' | 'pending';

// Form field interfaces
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
}

// Authentication credentials
export interface AuthCredentials {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

// User profile information
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatar?: string;
}

// Authentication response from Firebase
export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Authentication error from Firebase
export interface AuthError {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      domain: string;
      reason: string;
    }[];
  };
}

// Authentication context value
export interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  field?: string;
}

// Form input refs
export interface FormInputRefs {
  usernameRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  confpasswordInputRef?: React.RefObject<HTMLInputElement | null>;
}

// Login page props
export interface LoginPageProps {
  onLoginChange: (username: string) => void;
}

// Login form props
export interface LoginFormProps {
  onFormSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  onChangeUserAction: (action: UserAction) => void;
  userAction: UserAction;
  usernameInputRef: React.RefObject<HTMLInputElement | null>;
  passwordInputRef: React.RefObject<HTMLInputElement | null>;
  confpasswordInputRef?: React.RefObject<HTMLInputElement | null>;
  errorMessage?: string | null;
}

// Input validation functions
export interface InputValidators {
  checkUsername: (username: string) => ValidationResult;
  checkPassword: (password: string) => ValidationResult;
  checkConfirmPassword: (password: string, confirmPassword: string) => ValidationResult;
}

// Form classes utility
export interface FormClasses {
  getInputClasses: (isValid: boolean) => string;
  getButtonClasses: (disabled: boolean) => string;
  getErrorMessageClasses: () => string;
}

// Navigation items for authenticated/non-authenticated users
export interface NavigationAuthState {
  isAuthenticated: boolean;
  username?: string;
}

// Authentication button props
export interface AuthButtonProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  username?: string;
}

// Protected route props
export interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}
