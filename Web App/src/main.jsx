import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Header, Navbar, Footer, Login, Logout, ProtectedRoute } from "./components.jsx";
import { Pantry, Chef, About, Profile } from "./pages.jsx";
import { Accounts as InitialAccounts, UserID } from "./props.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";

// just scrolls to top everytime someone changes the page
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// had to do this separately to get useLocation to work
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [Accounts, setAccounts] = useState(InitialAccounts);

  return (
    <>
      <div style={{ height: "140px" }}></div>
      <ScrollToTop />

      <AuthProvider>
        <Header />
        {!isLoginPage && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/" element={<Navigate to="/kitchen" replace />} />
          <Route path="/pantry" element={
            <ProtectedRoute>
              <Pantry UserID={UserID} Accounts={Accounts} setAccounts={setAccounts} />
            </ProtectedRoute>
          } />
          <Route path="/kitchen" element={
            <ProtectedRoute>
              <Chef UserID={UserID} Accounts={Accounts} />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>

        <div style={{ height: "40px" }}></div>
        {!isLoginPage && <Footer />}
        <div style={{ height: "20px" }}></div>
      </AuthProvider>
    </>
  );
}

function Main() {
  return (
    <div style={{ backgroundColor: "#fff4e6", minHeight: "100vh" }}>
      <div className="ml-4 mr-4">
        <BrowserRouter>
          <AppContent />  
        </BrowserRouter>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);