import { FieldValue } from "firebase/firestore";

// export type Message = {
//   id: string;
//   timestamp: Date;
// };

// export type Chat = {
//   id: string;
//   users: Users;
// };

// export type Users = string[];

type Email = string;

export type DBUser = {
  email: Email;
  lastSeen: FieldValue;
  photoURL: string;
};

export type DBChat = {
  users: Email[];
  messages: DBMessage[];
};

export type DBMessage = {
  id?: string;
  timestamp: FieldValue | Date;
  message: string;
  user: Email;
  photoURL: string;
};
