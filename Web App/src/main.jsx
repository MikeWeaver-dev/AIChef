import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header, Navbar, Footer, Login, Logout, ProtectedRoute } from "./components.jsx";
import { Pantry, Chef, About, Profile } from "./pages.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import { FirestoreProvider } from "./contexts/FirestoreContext.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div style={{ height: "140px" }}></div>
      <ScrollToTop />

      <Header />
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<Navigate to="/kitchen" replace />} />
        <Route path="/pantry" element={
          <ProtectedRoute>
            <Pantry />
          </ProtectedRoute>
        } />
        <Route path="/kitchen" element={
          <ProtectedRoute>
            <Chef /> 
          </ProtectedRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>

      <div style={{ height: "40px" }}></div>
      {!isLoginPage && <Footer />}
      <div style={{ height: "20px" }}></div>
    </>
  );
}

function Main() {
  return (
    <div style={{ backgroundColor: "#fff4e6", minHeight: "100vh" }}>
      <div className="ml-4 mr-4">
        <BrowserRouter>
          <AuthProvider>
            <FirestoreProvider> 
              <AppContent />
            </FirestoreProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);