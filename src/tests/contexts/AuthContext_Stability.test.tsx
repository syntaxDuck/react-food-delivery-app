/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import React from "react";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";

// Mock Firebase
vi.mock("../../firebase/config", () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn((cb) => {
      cb(null);
      return () => {};
    }),
  },
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, cb) => {
    cb(null);
    return () => {};
  }),
  signInAnonymously: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  linkWithPopup: vi.fn(),
  linkWithCredential: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  EmailAuthProvider: {
    credential: vi.fn(),
  },
}));

describe("AuthProvider stability", () => {
  test("context value remains referentially stable on re-renders when state hasn't changed", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result, rerender } = renderHook(() => useAuth(), { wrapper });

    const firstValue = result.current;

    // Trigger a re-render of the wrapper (AuthProvider)
    rerender();

    const secondValue = result.current;

    // If memoized correctly, these should be the same object reference
    expect(firstValue).toBe(secondValue);

    // Check specific functions are stable
    expect(firstValue.signInWithEmail).toBe(secondValue.signInWithEmail);
    expect(firstValue.signOut).toBe(secondValue.signOut);
  });
});
