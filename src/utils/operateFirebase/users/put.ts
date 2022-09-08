import { User } from "firebase/auth";
import { db } from "~/firebase";
import { doc, setDoc } from "firebase/firestore";

import type { DBUser } from "~/types/index";

export const updateUser = (user: User) => {
  return async (userData: Partial<DBUser>) => {
    const userRef = doc(db, "users", user.uid);
    const option = {
      merge: true,
    };

    await setDoc(userRef, userData, option);
  };
};
