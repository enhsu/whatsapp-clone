// import { User } from "firebase/auth";
// import { db } from "~/firebase";
// import { doc, collection, setDoc, addDoc } from "firebase/firestore";

// import type { DBMessage, DBUser } from "~/types/index";

// export const updateUser = async (user: User, userData: DBUser) => {
//   const userRef = doc(db, "users", user.uid);
//   const option = {
//     merge: true,
//   };

//   await setDoc(userRef, userData, option);
// };

// export const addMessage = async (chatId: string, messageData: DBMessage) => {
//   const messageRef = collection(db, "chats", chatId, "messages");

//   await addDoc(messageRef, messageData);
// };

import users from "./users";
import chats from "./chats";

const REST = {
  users,
  chats,
};

export default REST;
