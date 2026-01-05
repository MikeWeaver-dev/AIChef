import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter, useLocation } from "react-router-dom";
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Header, Navbar, Footer, Login, Logout, ProtectedRoute} from "./components.jsx";
import {Pantry, Chef, About, Profile} from "./pages.jsx"
import {Accounts as InitialAccounts, UserID} from "./props.jsx"
import { AuthProvider } from "./contexts/authContext/index.jsx";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Main(){
  const [Accounts, setAccounts] = useState(InitialAccounts);


  return(
    <>
      <BrowserRouter>
        <div style={{ height: "140px" }}></div>
        <ScrollToTop/>
        <AuthProvider>
          <Header/>
          <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
           
            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/kitchen" replace />} />
            <Route path="/pantry" element={
              <ProtectedRoute>
                <Pantry UserID={UserID} Accounts={Accounts} setAccounts={setAccounts}/>
              </ProtectedRoute>
            }/>
            <Route path="/kitchen" element={
              <ProtectedRoute>
                <Chef UserID={UserID} Accounts={Accounts}/>
              </ProtectedRoute>
            }/>
            <Route path="/about" element={<About/>}/> {/* Public route */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }/>
          </Routes>
          <div style={{ height: "40px" }}></div>
          <Footer/>
          <div style={{ height: "20px" }}></div>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}


createRoot(document.getElementById("root")).render(<Main />);
