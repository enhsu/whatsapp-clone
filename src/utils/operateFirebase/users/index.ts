import { User } from "firebase/auth";
import { updateUser } from "./put";
// import { getUserByEmail } from "./get";

const REST = (user?: User) => ({
  put: updateUser(user!),
});

export default REST;
