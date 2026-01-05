import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/Firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./authContext/index.jsx";

const FirestoreContext = createContext();

export function FirestoreProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load pantry when user changes
  useEffect(() => {
    if (!user) {
      setPantryItems([]);
      setLoading(false);
      return;
    }

    const loadPantry = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPantryItems(data.pantryItems || []);
        } else {
          // New user → create document with default pantry
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
          await setDoc(userDocRef, { pantryItems: defaultPantry });
          setPantryItems(defaultPantry);
        }
      } catch (err) {
        console.error("Error loading pantry:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPantry();
  }, [user]);

  // Helper to update pantry in Firestore
  const updatePantryInDb = async (newPantry) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { pantryItems: newPantry });
    } catch (err) {
      console.error("Error saving pantry:", err);
    }
  };

  // Functions your components will use
  const addItem = (name, quantity) => {
    const newId = Math.max(0, ...pantryItems.map(i => i.id || 0)) + 1;
    const newItem = { id: newId, name, quantity: quantity || "1x" };
    const updated = [...pantryItems, newItem];
    setPantryItems(updated);
    updatePantryInDb(updated);
  };

  const updateItem = (id, name, quantity) => {
    const updated = pantryItems.map(item =>
      item.id === id ? { ...item, name, quantity } : item
    );
    setPantryItems(updated);
    updatePantryInDb(updated);
  };

  const deleteItem = (id) => {
    const updated = pantryItems.filter(item => item.id !== id);
    setPantryItems(updated);
    updatePantryInDb(updated);
  };

  return (
    <FirestoreContext.Provider
      value={{
        pantryItems,
        loading: loading || authLoading,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestore() {
  return useContext(FirestoreContext);
}