import { collection, query, where } from "firebase/firestore";
import { db } from "~/firebase";

export const getUserByEmail = (email: string) => {
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("email", "==", email));
};
