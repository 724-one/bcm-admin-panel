import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Get all calculator items
export const getCalculatorItems = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "calculators"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting calculator items:", error);
        throw error;
    }
};

// Add a new calculator item
export const addCalculatorItem = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "calculators"), data);
        return docRef.id;
    } catch (error) {
        console.error("Error adding calculator item:", error);
        throw error;
    }
};

// Get a single calculator item by ID
export const getCalculatorById = async (id) => {
    try {
        const docRef = doc(db, "calculators", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Calculator not found");
        }
    } catch (error) {
        console.error("Error getting calculator:", error);
        throw error;
    }
};