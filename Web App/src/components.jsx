import React, { useState } from "react";
import { Edit2, Trash2, Check, X, Package, ChefHat } from 'lucide-react';

// I always try to map through components to make my code cleaner in pages and main


export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-50 to-orange-200/80 backdrop-blur-md z-1000">
      <div className="flex items-center justify-center gap-6 py-4">
        <ChefHat className = "w-14 h-14 mb-1 text-gray-700"/>
        <h1 className="text-gray-700 text-4xl tracking-wide font-['Lobster']">My Ai Kitchen</h1> 
      </div>
    </header>
  );
}

export function Navbar({setPage, page}) {

  const buttonClass = "text-gray-600 hover:text-gray-900 font-semibold px-2 sm:px-4 py-1 rounded-lg hover:bg-orange-300/30 transition-all cursor-pointer text-sm sm:text-base";
  return (
    <nav className ="fixed top-[92px] left-0 w-full bg-gradient-to-r from-orange-400/20 to-orange-400/40 backdrop-blur-lg shadow-md z-40">
      <div className="flex items-center justify-between px-2 sm:px-6 py-1">
        <div className="flex gap-1 sm:gap-4">
          <button className = {buttonClass} onClick={() => setPage("Pantry")}>My Pantry</button>
          <button className = {buttonClass} onClick={() => setPage("Chef")}>AI Chef</button>
          <button className = {buttonClass} onClick={() => setPage("About")}>About</button>
        </div>
        <button className={buttonClass} onClick={() => setPage("Profile")}>Profile</button>
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

export function Footer() {
  return(
    <>
      <footer className = "text-left ml-4">
        <div>
          <p className = "text-gray-600">
            Web App Developed by Mike Weaver
          </p>
        </div>
      </footer>
    </>
  )
}
