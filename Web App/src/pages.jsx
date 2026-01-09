import {Card, ThisApp, PantryItem} from "./components"
import {useState, useEffect} from "react"
import { ChefHat, Sparkles, Send, Plus, ShoppingBasket, Lightbulb, X} from 'lucide-react';
import { useAuth } from "./contexts/authContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase.js";
import { useFirestore } from "./contexts/FirestoreContext.jsx";


export function Pantry() {
  const { pantryItems, loading, addItem, updateItem, deleteItem } = useFirestore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [showPrefilledModal, setShowPrefilledModal] = useState(false);

  // Default prefilled pantry when user first logs in
  const defaultPantry = [
    { id: 1, name: "eggs", quantity: "one dozen" },
    { id: 2, name: "chicken breast", quantity: "2 lbs" },
    { id: 3, name: "pasta", quantity: "1 box" },
    { id: 4, name: "rice", quantity: "2 lbs" },
    { id: 5, name: "olive oil", quantity: "1 bottle" },
    { id: 6, name: "garlic", quantity: "1 bulb" },
    { id: 7, name: "onions", quantity: "3 medium" },
    { id: 8, name: "tomatoes", quantity: "4 large" },
    { id: 9, name: "bell peppers", quantity: "2" },
    { id: 10, name: "spinach", quantity: "1 bunch" },
    { id: 11, name: "parmesan cheese", quantity: "8 oz" },
    { id: 12, name: "soy sauce", quantity: "1 bottle" }
  ];

  // Check if pantry is identical to default and if so it'll pop up a modal thing
  const isPrefilled = () => {
    if (pantryItems.length !== defaultPantry.length) return false;
    return pantryItems.every((item, idx) => 
      item.name === defaultPantry[idx].name && 
      item.quantity === defaultPantry[idx].quantity
    );
  };

  useEffect(() => {
    if (!loading && isPrefilled()) {
      setShowPrefilledModal(true);
    }
  }, [pantryItems, loading]);

  //firestore stuff!
  const handleAdd = () => {
    if (!newItem.trim()) return;
    addItem(newItem, newQuantity);
    setNewItem("");
    setNewQuantity("");
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your pantry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff4e6] py-8 px-4">
      {/* Prefilled Modal only if they havent touched their pantry*/}
      {showPrefilledModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative group max-w-md w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full mb-4">
                  <ShoppingBasket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-4">Welcome to Your Pantry!</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your pantry has been pre-filled to help you demo the app. Please feel free to update your pantry as appropriate.
                </p>
                <button
                  onClick={() => setShowPrefilledModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full mb-6 shadow-lg">
            <ShoppingBasket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl text-orange-700 mb-3 drop-shadow-sm">My Pantry</h1>
          <p className="text-gray-600 text-lg">Manage your available ingredients</p>
        </div>

        {/* Add New Item Button */}
        <div className="mb-8">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-300/60 to-orange-400/60 hover:from-orange-300/90 hover:to-orange-400/90 text-white font-semibold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <Plus className="w-6 h-6" />
              Add New Item
            </button>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-40"></div>
              <div className="relative bg-orange-50 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-orange-700 mb-4">Add New Item</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Item name (e.g., Chicken)"
                    className="w-full px-4 py-3 bg-orange-100/60 border-2 border-orange-300 rounded-xl focus:border-orange-500 outline-none text-gray-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAdd();
                    }}
                  />
                  <input
                    type="text"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="Quantity (e.g., 2 lbs, 500g)"
                    className="w-full px-4 py-3 border-2 bg-orange-100/60 border-orange-300 rounded-xl focus:border-orange-500 outline-none text-gray-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAdd();
                    }}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAdd}
                      disabled={!newItem.trim()}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-300/70 hover:to-orange-400/70 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Add Item
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewItem("");
                        setNewQuantity("");
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-300/70 to-gray-400/70 hover:from-gray-300 hover:to-gray-400 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pantry Items Grid */}
        {pantryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pantryItems.map((item) => (
              <PantryItem
                key={item.id}
                id={item.id}
                item={item.name}
                quantity={item.quantity}
                onUpdate={updateItem}
                onDelete={deleteItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="inline-block p-6 bg-orange-100/50 rounded-full mb-6">
              <ShoppingBasket className="w-16 h-16 text-orange-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Your pantry is empty</p>
            <p className="text-gray-400">Add some ingredients to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Chef() {
  const { pantryItems } = useFirestore();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const pantryItemNames = pantryItems.map(item => item.name);

  function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^#### (.*$)/gm, '<h2 class="text-lg font-bold text-orange-800 mt-0 mb-0">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-orange-700 mt-6 mb-0">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-orange-800 mt-0 mb-0">$1</h2>')
    .replace(/\n/g, '<br />'); 
}

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse("");
    
    //backend is hosted on Render and accessed here
    try {
      const res = await fetch("https://aichefbackend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: `You are a helpful cooking assistant. here are rules for you to follow: 1) if the user asks for help with a recipe please give them the dish and recipe. 2) if the user asks about something other than cooking answer their question and be responsive and polite. 3) cook with anything you want, but show a slight preference for things in the pantry. If you suggest cooking with other ingredients remind the user they may need to buy those. User 'pantry': ${pantryItemNames.join(", ")}. User request: ${prompt}` 
        }),
      });

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, there was an error getting your recipe. Please make sure the server is running and try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fff4e6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full mb-6 shadow-lg">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl text-orange-700 mb-3 drop-shadow-sm">AI Chef</h1>
          <p className="text-gray-600 text-lg">Type in what you're craving and I can help find the perfect recipe</p>
        </div>

        {/* Main Input Card */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          
          <div className="relative bg-gradient-to-r from-orange-50 to-orange-50 rounded-3xl shadow-xl p-8">
            {/* Pantry Preview */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Your Pantry</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pantryItemNames.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal meal..."
                className="w-full bg-orange-100/50 p-5 pr-16 border-2 border-orange-200 focus:border-orange-400 rounded-2xl resize-none overflow-hidden transition-all outline-none text-gray-700 placeholder-gray-400 bg-orange-50/30"
                rows="3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              
              {/* Send Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full transition-all transform hover:scale-110 disabled:scale-100 flex items-center justify-center shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="relative group mb-12 mt-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3">
                <ChefHat className="w-8 h-8 shrink-0 text-orange-600 animate-bounce mr-2" />
                <p className="text-lg font-medium text-orange-700">Cooking up something delicious... Please be patient</p>
              </div>
            </div>
          </div>
        )}

        {/* Response Card */}
        {response && !loading && (
          <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl blur opacity-40"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-orange-300/60 to-orange-400/50 p-6">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-8 h-8 text-white" />
                  <h3 className="font-lobster text-3xl text-white drop-shadow">Your Recipe</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 bg-orange-100/40">
                <div className="prose prose-orange max-w-none">
                  <div 
                    className="text-gray-700 text-base text-center leading-8"
                    dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-orange-200">
                  <button 
                    onClick={() => setResponse("")}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-orange-700 font-semibold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    Try Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!response && !loading && (
          <div className="text-center py-16 px-4">
            <div className="inline-block p-6 bg-orange-100/50 rounded-full mb-6">
              <ChefHat className="w-16 h-16 text-orange-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Ready to create something delicious?</p>
            <p className="text-gray-400">Describe your ideal meal above and let's get cooking!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export function About(){
    
  return(
    <>
      <div className="py-4 px-4"></div>
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full mb-6 shadow-lg">
          <Lightbulb className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl text-orange-700 mb-3 drop-shadow-sm">About This App</h1>
        <p className="text-gray-600 text-lg">Instructions and development information from Mike Weaver</p>
      </div>
      
      <div className = "wrap justify-left">
        
        <ThisApp
          title = "How to Use:"
          description= "Step one is to click on 'Pantry' and ensure the food listed there is reflective of what you have on hand. Then, go to 'AI Chef' and input any specific nuances about the meal or how you want to prepare it. The AI Chef will output a meal and recipe based on your food and input"
        />

        <ThisApp
          title = "About this App:"
          description= "This is my third major coding project and the first one where I leverage ReactNative to create a mobile app for IOS and Android. This app has slightly less functionality than my other projects (listed below) and instead focuses more heavily on a compelling frontend and well optimized ui/ux."
        />

        <h3 className = "text-orange-700/80 2xl mb-3 mt-6 font-semibold text-center">Other Apps and Projects</h3>
        <hr className="mb-6 border-t-1 border-orange-300 py-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
          <Card 
            link = "https://MikeWeaver.dev"
            title = "MikeWeaver.dev"
            description = "This link takes you directly to my portfolio - a website for all my coding projects and qualifications. From there you can access my web apps, source code, resume, and more."
          />

          <Card 
            link = "https://MikeWeaver.dev/CensusView"
            title = "CensusView"
            description = "This visualization tool leverages millions of Census data points to map demographic and housing trends at the state, county, and neighborhood level."
          />
          
          <Card 
            link = "https://voyage.MikeWeaver.dev/"
            title = "Voyage"
            description = "This web app is a working and scalable social media platform where users can post about their travels and experiences."
          />

          <Card 
            link = "https://MikeWeaver.dev/SpotifyLab"
            title = "SpotifyLab"
            description = "Optimized for desktop and mobile and available on the ios and the Google Play store, this app leverages artificial intelligence to generate bespoke playlists based on user inputs and Spotify listening history."
          />
        </div>
      </div>
    </>
  )
}

export function Profile() {
  const { user } = useAuth(); // Get the actual logged-in user
  const navigate = useNavigate();
  const { pantryItems } = useFirestore();

  // If there's no user (shouldn't happen due to ProtectedRoute, but just in case)
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <div style={{ height: "50px" }}></div>
      <div className="flex items-center justify-center px-4 py-4">
        <div className="relative group w-full max-w-md">

          {/* Soft orange glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          
          <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            <div className="relative z-10">
              <h3 className="text-2xl text-orange-700 mb-5 transform transition-all duration-300 hover:scale-105 inline-block drop-shadow-sm">
                Profile
              </h3>

              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Email:</p>
                <p className="text-gray-800 font-semibold text-lg">{user.email}</p>
              </div>

              {user.displayName && (
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-1">Name:</p>
                  <p className="text-gray-800 font-semibold">{user.displayName}</p>
                </div>
              )}

             <div className="mb-6">
              {pantryItems?.length === 0 ? (
                <p className="text-gray-500 font-semibold text-md">
                  You have no items in your pantry!
                </p>
              ) : pantryItems.length === 1 ? (
                <p className="text-gray-500 font-semibold text-md">
                  You have 1 item in your pantry!
                </p>
              ) : (
                <p className="text-gray-500 font-semibold text-md">
                  You have {pantryItems.length} items in your pantry!
                </p>
              )}
            </div>

              <div style={{ height: "16px" }}></div>
              
              <button
                onClick={handleLogout}
                className="
                  block w-full bg-gradient-to-r from-orange-200 to-orange-300
                  hover:from-orange-300 hover:to-orange-400
                  text-white font-semibold text-center
                  py-3 rounded-lg
                  transition-all duration-300
                  transform hover:-translate-y-1 hover:shadow-lg
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>  
  )
}


export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        // Wait a moment to ensure signOut completes
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } catch (err) {
        console.error("Logout error:", err);
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Logging out...</p>
      </div>
    </div>
  );
}
