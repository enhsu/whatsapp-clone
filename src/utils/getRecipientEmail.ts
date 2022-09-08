import { User } from "firebase/auth";

const getRecipientEmail: (users: string[], userLoggedIn: User) => string = (
  users,
  userLoggedIn
) => {
  return users?.filter((user) => user !== userLoggedIn?.email)[0];
};

export default getRecipientEmail;
