import styled from "styled-components";
import { Avatar } from "@mui/material";
import getRecipientEmail from "~/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { auth, db } from "~/firebase";
import { useRouter } from "next/router";
import { DBUser } from "~/types";

type PropsType = {
  id: string;
  users: string[];
};

function Chat({ id, users }: PropsType) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  // Get recipient eamil
  const recipientEmail = getRecipientEmail(users, user!);
  // Create recipientRef
  const usersRef = collection(db, "users");
  const recipientRef = query(usersRef, where("email", "==", recipientEmail));
  // Get recipient snapshot
  const [recipientSnapshot] = useCollection(recipientRef);
  let recipient: DBUser = recipientSnapshot?.docs[0]?.data() as DBUser;

  const enterChatRoom = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={() => enterChatRoom()}>
      {recipient ? (
        <UserAvatar src={recipient.photoURL} alt="avatar image" />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
