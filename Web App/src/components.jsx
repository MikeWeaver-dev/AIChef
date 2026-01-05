import { NavLink, Navigate, useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react"; // Add useEffect here
import { Edit2, Trash2, Check, X, Package, ChefHat } from 'lucide-react';
import { auth } from "./Firebase/Firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

// I always try to map through components to make my code cleaner in pages and main

export function Header() {
  const location = useLocation(); 

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-100 to-orange-200/80 backdrop-blur-md z-1000">
      <div className="flex items-center justify-center gap-6 py-4">
        <ChefHat className = "w-14 h-14 mb-1 text-gray-700"/>
        <h1 className="text-gray-700 text-4xl tracking-wide font-['Lobster']">Ai Chef</h1>
        {isLoginPage && <hr className = "w-full fixed top-[92px] border-orange-300"/>}
      </div>
    </header>
  );
}

export function Navbar() {


  const buttonClass = "text-gray-600 hover:text-gray-900 font-semibold px-2 sm:px-4 py-1 rounded-lg hover:bg-orange-300/30 transition-all cursor-pointer text-sm sm:text-base";
  const activeClass = "text-orange-800 hover:text-orange-900 font-semibold px-2 sm:px-4 py-1 rounded-lg hover:bg-orange-300/30 transition-all cursor-pointer text-sm sm:text-base";


  return (
    <nav className ="fixed top-[92px] left-0 w-full bg-gradient-to-r from-orange-400/20 to-orange-400/40 backdrop-blur-lg shadow-md z-40 border-b-1 border-orange-300">
      <div className="flex items-center justify-between px-2 sm:px-6 py-1">
        <div className="flex gap-1 sm:gap-4">
          <NavLink className = {({ isActive }) =>isActive ? `${buttonClass} ${activeClass}` : buttonClass} to="/pantry">My Pantry</NavLink>
          <NavLink className = {({ isActive }) =>isActive ? `${buttonClass} ${activeClass}` : buttonClass} to="/kitchen">AI Chef</NavLink>
          <NavLink className = {({ isActive }) =>isActive ? `${buttonClass} ${activeClass}` : buttonClass} to="/about">About</NavLink>
        </div>
        <NavLink className={({ isActive }) =>isActive ? `${buttonClass} ${activeClass}` : buttonClass} to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}


export function ThisApp({title, description}) {
  return (
    <div className="flex items-center justify-center px-4 py-5">
      <div className="relative group w-full max-w-4xl">
        {/* Subtle orange glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-700"></div>
       
        <div className="relative bg-[#fff4e6] rounded-2xl shadow-xl p-10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
         
          <div className="relative z-10">
            <h3 className="text-2xl text-orange-700 mb-6 transform transition-all duration-300 hover:scale-105 inline-block drop-shadow-sm">
              {title}
            </h3>


            <div className="absolute top-2 right-0 w-1.5 h-1.5 bg-orange-400/50 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-orange-500/50 rounded-full animate-ping delay-75"></div>
         
            <div className="relative overflow-hidden group/inner">
             
              <p className="text-gray-700 leading-relaxed relative z-10 py-3">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export function Card({link, title, description}) {
  return (
    <div className="flex items-center justify-center px-4 py-4">
      <div className="relative group w-full max-w-md">
        {/* Soft orange glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
       
        <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
          {/* Corner decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-100/70 to-transparent rounded-tr-full"></div>


          <div className="relative z-10">
            <a href = {link} target = "blank" className = "text-2xl text-orange-700 mb-5 transform transition-all duration-300 hover:scale-105 inline-block drop-shadow-sm">
              {title}
            </a>


            <p className="text-gray-700 mb-6 leading-relaxed">
              {description}
            </p>


            <a href={link} target="blank" rel="noopener noreferrer" className="block">
              <button className="
                w-full relative
                bg-gradient-to-r from-orange-200/60 to-orange-300/70
                hover:from-orange-200/50 hover:to-orange-300/70
                text-white font-semibold text-lg
                py-2 rounded-lg
                transition-all duration-300
                transform hover:-translate-y-1 hover:shadow-lg
                overflow-hidden
                group/button
              ">
                <span className="relative z-10">Visit Site</span>
                {/* Subtle shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


export function PantryItem({ id, item, quantity, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item);
  const [editQuantity, setEditQuantity] = useState(quantity);


  const handleSave = () => {
    onUpdate(id, editName, editQuantity);
    setIsEditing(false);
  };


  const handleCancel = () => {
    setEditName(item);
    setEditQuantity(quantity);
    setIsEditing(false);
  };


  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
     
      <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {isEditing ? (
          // Edit Mode
          <div className="space-y-3">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 outline-none text-gray-700"
              placeholder="Item name"
            />
            <input
              type="text"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 outline-none text-gray-700"
              placeholder="Quantity"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!editName.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-gray-800 font-semibold text-lg">{item}</h4>
                <p className="text-gray-600 text-sm">{quantity}</p>
              </div>
            </div>
           
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-orange-200/50 hover:bg-orange-300/70 rounded-lg transition-all transform hover:scale-110"
              >
                <Edit2 className="w-4 h-4 text-orange-700" />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-2 bg-red-200/50 hover:bg-red-300/70 rounded-lg transition-all transform hover:scale-110"
              >
                <Trash2 className="w-4 h-4 text-red-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/kitchen");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/kitchen");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="relative group w-full max-w-md">
        {/* Soft orange glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-700"></div>
        
        <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isSignUp ? "Create account with Google" : "Continue with Google"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-orange-50 to-orange-100 text-gray-600">{isSignUp ? "Or sign up with email" : "Or continue with email"}</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 outline-none text-gray-700 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 outline-none text-gray-700 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-lg py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          
          <p className="text-center text-gray-700 mt-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:text-orange-700 font-semibold underline transition-colors"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}


export function Logout() {
  const navigate = useNavigate();


  useEffect(() => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }, [navigate]);


  return <div>Logging out...</div>;
}


// I know this probably should be in its own file but what the hell
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();


  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return children;
}


export function Footer() {
  return(
    <>
      <footer className = "text-left ml-4">
        <div>
          <p className = "text-gray-600 ml-4">
            Web App Developed by Mike Weaver
          </p>
        </div>
      </footer>
    </>
  )
}
