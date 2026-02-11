import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { PROJECT_ID } from "./private/PRIVATE";

export const FIREBASE_ENDPOINT = `https://${PROJECT_ID}.firebaseio.com/`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginChange = (_username: string) => {
    setIsLoggedIn(true);
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/index" />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage onLoginChange={handleLoginChange} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
