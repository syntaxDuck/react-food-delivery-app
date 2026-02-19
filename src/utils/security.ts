import type { ValidationResult } from '../types/auth';

/**
 * Maps technical Firebase Auth error codes to generic, safe messages
 * to prevent account enumeration and reveal minimal system information.
 */
export const getSanitizedAuthError = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) {
    return 'Authentication failed. Please try again.';
  }

  const code = (error as { code?: string }).code;

  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'This authentication method is not enabled.';
    default:
      return 'Authentication failed. Please try again.';
  }
};

/**
 * Maps technical API or Firestore errors to generic messages.
 */
export const getSanitizedApiError = (error: unknown): string => {
  console.error('[Security] API Error:', error);
  return 'A server error occurred. Please try again later.';
};

/**
 * Enforces a strong password policy:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const validatePassword = (password: string): ValidationResult => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()\-_=+]/.test(password);
  const isLongEnough = password.length >= 8;

  if (isLongEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
    return { isValid: true, errors: [] };
  }

  return {
    isValid: false,
    errors: ['Password must be at least 8 characters with uppercase, lowercase, number and special character'],
  };
};
