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
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const alkesRef = collection(db, "alkes");

// Create operation
export async function createAlkes(data) {
  try {
    // Menambahkan dokumen ke koleksi alkesRef dengan data yang diberikan
    const docRef = await addDoc(alkesRef, data);

    // Mengembalikan ID dokumen yang dibuat oleh Firestore
    return docRef.id;
  } catch (error) {
    // Melempar kembali error jika terjadi kesalahan
    throw error;
  }
}

// Read operation
export async function getAllAlkes(pageSize = 5, startAfterDoc = null) {
  try {
    let alkesQuery = alkesRef;

    // Apply ordering
    alkesQuery = query(alkesRef, orderBy("createdAt", "desc"), limit(pageSize));

    // If there's a starting document, adjust the query to start after it
    if (startAfterDoc) {
      alkesQuery = query(alkesQuery, startAfter(startAfterDoc));
    }

    const snapshot = await getDocs(alkesQuery);
    const alkes = [];
    let lastVisible = null;

    // Get last visible document for pagination
    if (!snapshot.empty) {
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
    }

    snapshot.forEach((doc) => {
      alkes.push({ id: doc.id, ...doc.data() });
    });

    console.log(alkes, lastVisible);

    return { alkes, lastVisible };
  } catch (error) {
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
