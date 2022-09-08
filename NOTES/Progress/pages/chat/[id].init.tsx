import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { auth, db } from "~/firebase";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "~/components/ChatScreen";
import Sidebar from "~/components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "~/utils/getRecipientEmail";
import type { Chat, Message } from "~/types/index";

type PropsType = {
  chat: Chat;
  messages: Message[];
};

function ChatRoom({ chat, messages }: PropsType) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user!)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = async function (context) {
  // Prepare the messages on the server
  const chatRef = doc(db, "chats", context.query.id as string);
  const chatRes = await getDoc(chatRef);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  const msgRef = collection(
    db,
    "chats",
    context.query.id as string,
    "messages"
  );
  const msgQuery = query(msgRef, orderBy("timestamp", "asc"));
  const msgRes = await getDocs(msgQuery);
  const messages = msgRes.docs
    .map((doc) => ({
      id: doc.id,
      timestamp: doc.data().timestamp,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      // Important: Whenever we are doing at the API, stringify the timestamp from API to client, we'll lose the timestamp data type
      timestamp: message.timestamp.toDate().getTime(),
    }));

  return {
    props: {
      chat: chat,
      messages: JSON.stringify(messages),
    },
  };
};

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
