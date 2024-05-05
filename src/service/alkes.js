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

export const getData = async () => {
  try {
    const response = await getDocs();
  } catch (error) {}
};
export async function getAllAlkes() {
  try {
    const alkesQuery = query(alkesRef, orderBy("createdAt", "desc"));

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

export async function updateAlkes(id, data) {
  try {
    await updateDoc(doc(alkesRef, id), data);
  } catch (error) {
    throw error;
  }
}

export async function deleteAlkes(id) {
  try {
    await deleteDoc(doc(alkesRef, id));
  } catch (error) {
    throw error;
  }
}

// export const getData = async (restaurantId: string, page: number = 1) => {
//   const pageSize = 5;
//   let result = [];
//   let error;

//   try {
//     const response = await db
//       .collection("/ratings")
//       .where("restaurantId", "==", restaurantId)
//       .orderBy("ratedAt", "==", "desc")
//       // only show 5 results per fetch
//       .limit(pageSize)
//       // on the first page, offset by 0 (= show latest 5 results)
//       // then, for each next page, jump forward by 5 (= page size)
//       .offset(pageSize * (page - 1))
//       .get()
//     response.docs.map(doc => result.push(doc.data()))
//   } catch (e) {
//     error = e as Error;
//     // handle error
//   }
//   return { error, result }
// }
