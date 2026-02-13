/**
 * Security utilities for sanitizing errors and preventing information leakage.
 */

/**
 * Maps Firebase Auth and generic authentication errors to user-friendly messages.
 * Prevents account enumeration and leakage of internal API details.
 */
export const getSanitizedAuthError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('EMAIL_NOT_FOUND') || message.includes('INVALID_PASSWORD')) {
    return 'Invalid email or password.';
  }
  if (message.includes('USER_DISABLED')) return 'This account has been disabled.';
  if (message.includes('EMAIL_EXISTS')) return 'This email is already in use.';
  if (message.includes('TOO_MANY_ATTEMPTS')) return 'Too many attempts. Please try again later.';
  if (message.includes('WEAK_PASSWORD')) return 'Password is too weak.';
  if (message.includes('HTTP 401') || message.includes('HTTP 403')) return 'Authentication failed.';

  return 'An error occurred during authentication. Please try again.';
};

/**
 * Maps API status codes and network errors to generic messages.
 * Prevents leakage of technical implementation details or server state.
 */
export const getSanitizedApiError = (error: unknown): string => {
  const message = (error instanceof Error ? error.message : String(error));
  const status = Number(message);

  if (!isNaN(status) && status > 0) {
    if (status >= 500) return 'Server error. Please try again later.';
    if (status === 401 || status === 403) return 'Access denied.';
    if (status === 404) return 'The requested resource was not found.';
    return 'An error occurred while communicating with the server.';
  }

  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('network') || lowerMsg.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  if (lowerMsg.includes('permission') || lowerMsg.includes('unauthorized')) {
    return 'Access denied.';
  }

  return 'An unexpected error occurred.';
};
