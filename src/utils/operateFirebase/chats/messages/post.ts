import { db } from "~/firebase";
import { collection, addDoc } from "firebase/firestore";

import type { DBMessage } from "~/types/index";

export const addMessage = (chatId: string) => {
  return async (messageData: DBMessage) => {
    const messageRef = collection(db, "chats", chatId, "messages");

    await addDoc(messageRef, messageData);
  };
};
