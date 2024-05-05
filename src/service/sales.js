import {
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

export async function createSale(data, alkesId) {
  try {
    const saleData = { ...data, alkesId, createdAt: new Date().toISOString() };

    const docRef = await addDoc(salesRef, saleData);

    return docRef.id;
  } catch (error) {
    throw error;
  }
}

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

export async function getSalesByAlkesId(alkesId) {
  try {
    const salesQuery = query(salesRef, where("alkesId", "==", alkesId));
    const snapshot = await getDocs(salesQuery);
    const sales = [];
    snapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() });
    });

    const sortedSales = sales.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedSales;
  } catch (error) {
    throw error;
  }
}

export async function updateSale(id, data) {
  try {
    await updateDoc(doc(salesRef, id), data);
  } catch (error) {
    throw error;
  }
}

export async function deleteSale(id) {
  try {
    await deleteDoc(doc(salesRef, id));
  } catch (error) {
    throw error;
  }
}
