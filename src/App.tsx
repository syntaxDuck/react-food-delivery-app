import React from "react";
import { Routes, Route, Navigate } from "react-router";

import Layout from "./components/layout/Layout"

import { PROJECT_ID } from "./private/PRIVATE";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

export const FIREBASE_ENDPOINT = "https://" + [PROJECT_ID] + ".firebaseio.com/";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/index" />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage onLoginChange={setIsLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
