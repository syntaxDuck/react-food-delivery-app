import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";

import Layout from "./components/layout/Layout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
    },
  },
});

function AppContent() {
  const { isAuthenticated, isAnonymous, isLoading, signInAnonymous } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void signInAnonymous();
    }
  }, [isLoading, isAuthenticated, signInAnonymous]);

  return (
    <Layout isLoggedIn={isAuthenticated && !isAnonymous}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/index" />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
