import { StrictMode, useState, useEffect, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Header, Navbar, Footer} from "./components.jsx";
import {Pantry, Chef, About, Profile, Logout} from "./pages.jsx"
import {Accounts as InitialAccounts, UserID} from "./props.jsx"


function Main(){

  const [page, setPage] = useState("Chef");
  const [Accounts, setAccounts] = useState(InitialAccounts);

  return(
    <>
      <Header/>
      <Navbar setPage={setPage} page = {page} />
      <div style={{ height: "120px" }}></div>
      {page === "Pantry" && <Pantry UserID={UserID} Accounts={Accounts} setAccounts={setAccounts}/>}
      {page === "Chef" && <Chef UserID={UserID} Accounts={Accounts}/>}
      {page === "About" && <About/>}
      {page === "Profile" && <Profile UserID={UserID} Accounts={Accounts} setPage={setPage}/>}
      {page === "Logout" && <Logout setPage={setPage}/>}
      <div style={{ height: "40px" }}></div>
      <Footer/>
      <div style={{ height: "20px" }}></div>
    </>
  )
}

createRoot(document.getElementById("root")).render(<Main />);