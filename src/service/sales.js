import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const salesRef = collection(db, "sales");

// Create operation with foreign key reference to alkes
export async function createSale(data, alkesId) {
  try {
    // Add the alkes ID or reference to the sale data
    const saleData = { ...data, alkesId }; // Assuming alkesId is the field name for the foreign key

    // Add a new document to the 'sales' collection with the modified data
    const docRef = await addDoc(salesRef, saleData);

    // Return the ID of the newly created document
    return docRef.id;
  } catch (error) {
    // Throw an error if something goes wrong
    throw error;
  }
}

// Read operation: Get all sales or get sales sorted by date
export async function getAllSales(sortByDate = false) {
  try {
    let salesQuery = salesRef;

    if (sortByDate) {
      salesQuery = query(salesRef, orderBy("date"));
    }

    const snapshot = await getDocs(salesQuery);
    const sales = [];
    snapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() });
    });
    return sales;
  } catch (error) {
    throw error;
  }
}

// Read operation: Get sale by ID
export async function getSaleById(id) {
  try {
    const docSnap = await getDoc(doc(salesRef, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    throw error;
  }
}

// Read operation: Get sales by alkes ID
export async function getSalesByAlkesId(alkesId) {
  try {
    const salesQuery = query(salesRef, where("alkesId", "==", alkesId));
    const snapshot = await getDocs(salesQuery);
    const sales = [];
    snapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() });
    });
    return sales;
  } catch (error) {
    throw error;
  }
}

// Update operation
export async function updateSale(id, data) {
  try {
    await updateDoc(doc(salesRef, id), data);
  } catch (error) {
    throw error;
  }
}

// Delete operation
export async function deleteSale(id) {
  try {
    await deleteDoc(doc(salesRef, id));
  } catch (error) {
    throw error;
  }
}
