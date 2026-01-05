import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { StrictMode, useState, useEffect, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Header, Navbar, Footer} from "./components.jsx";
import {Pantry, Chef, About, Profile, Logout} from "./pages.jsx"
import {Accounts as InitialAccounts, UserID} from "./props.jsx"
import { AuthProvider } from "./contexts/authContext/index.jsx";

// export default function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

function Main(){

  const [Accounts, setAccounts] = useState(InitialAccounts);

  return(
    <>
      <BrowserRouter>
          {/* <ScrollToTop/> */}
          <Header/>
          <Navbar/>
          <div style={{ height: "120px" }}></div>
          <Routes>
            <Route path="/" element={<Navigate to="/kitchen" replace />} />
            <Route path="/pantry" element={<Pantry UserID={UserID} Accounts={Accounts} setAccounts={setAccounts}/>}/>
            <Route path="/kitchen" element={<Chef UserID={UserID} Accounts={Accounts}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile UserID={UserID} Accounts={Accounts}/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          <div style={{ height: "40px" }}></div>
          <Footer/>
          <div style={{ height: "20px" }}></div>
      </BrowserRouter>
    </>
  )
}

createRoot(document.getElementById("root")).render(<Main />);