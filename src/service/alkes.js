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
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const alkesRef = collection(db, "alkes");

export async function createAlkes(data) {
  try {
    const docRef = await addDoc(alkesRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
}

// Read operation
export async function getAllAlkes() {
  try {
    // Ensure alkesRef has been defined elsewhere in the code.
    const alkesQuery = query(alkesRef, orderBy("createdAt", "desc")); // Order by createdAt field in descending order

    const snapshot = await getDocs(alkesQuery);
    const alkes = [];
    let lastVisible = null;

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        alkes.push({ id: doc.id, ...doc.data() });
      });
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
    } else {
      console.log("Tidak ada data alat kesehatan yang ditemukan.");
    }

    console.log(alkes, lastVisible);

    return { alkes, lastVisible };
  } catch (error) {
    // Add additional error handling here if needed.
    throw error;
  }
}

export async function getAlkesById(id) {
  try {
    const docSnap = await getDoc(doc(alkesRef, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    throw error;
  }
}

// Update operation
export async function updateAlkes(id, data) {
  try {
    await updateDoc(doc(alkesRef, id), data);
  } catch (error) {
    throw error;
  }
}

// Delete operation
export async function deleteAlkes(id) {
  try {
    await deleteDoc(doc(alkesRef, id));
  } catch (error) {
    throw error;
  }
}
