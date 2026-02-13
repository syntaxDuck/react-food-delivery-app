/**
 * Security utilities for the application.
 */

/**
 * Sanitizes authentication error messages to prevent information leakage
 * (e.g., user enumeration) and technical details exposure.
 */
export const getSanitizedAuthError = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return "An unexpected authentication error occurred. Please try again.";
  }

  // Firebase Auth error codes often appear in the message string if not parsed properly,
  // or we might have custom error messages from our fetch logic.
  const message = error.message;

  // Prevent information leakage by using generic messages for common auth failures
  if (
    message.includes("EMAIL_NOT_FOUND") ||
    message.includes("INVALID_PASSWORD") ||
    message.includes("INVALID_EMAIL") ||
    message.includes("USER_DISABLED") ||
    message.includes("Status 400") ||
    message.includes("HTTP 400")
  ) {
    return "Invalid email or password. Please check your credentials and try again.";
  }

  if (message.includes("EMAIL_EXISTS")) {
    return "An account with this email already exists.";
  }

  if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return "Too many failed attempts. Please try again later for your security.";
  }

  // Log the actual error for developers (in a real app, use a proper logging service)
  console.error("[Security] Auth Error:", message);

  return "An error occurred during authentication. Please try again later.";
};

/**
 * Sanitizes general API error messages to prevent technical details exposure.
 */
export const getSanitizedApiError = (context: string): string => {
  return `Failed to ${context}. Please try again later.`;
};
