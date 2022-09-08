import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "~/firebase";
import type { DBChat, DBMessage } from "~/types/index";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import {
  collection,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "~/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "~/components/Message";
import React, { useRef, useState } from "react";
import OperateFirebase from "~/utils/operateFirebase";
import getRecipientEmail from "~/utils/getRecipientEmail";
import TimeAgo from "timeago-react";

type PropsType = {
  chat: DBChat;
  messages: string;
};

function ChatScreen({ chat, messages }: PropsType) {
  const eneOfMessagesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [user] = useAuthState(auth);
  // Create messages reference
  const messagesRef = collection(
    db,
    "chats",
    router.query.id as string,
    "messages"
  );
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
  // Message snap shot: for showMessages
  const [messagesSnapshot] = useCollection(messagesQuery);
  // input value: for sendMessage
  const [input, setInput] = useState<string>("");

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user as string}
          message={{
            ...message.data(),
            id: message.data().id,
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message: DBMessage) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Update the last seen
    OperateFirebase.users(user!).put({
      lastSeen: serverTimestamp(),
    });
    // Add message
    OperateFirebase.chats(router.query.id as string).messages.post({
      timestamp: serverTimestamp(),
      message: input,
      user: user?.email as string,
      photoURL: user?.photoURL as string,
    });

    setInput("");
    _scrollToButtom();
  };

  // Recipient information
  const recipientEmail = getRecipientEmail(chat.users, user!);
  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    where("email", "==", getRecipientEmail(chat.users, user!))
  );
  const [recipientSnapshot] = useCollection(usersQuery);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  function _scrollToButtom() {
    eneOfMessagesRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Container>
      {/* Header */}
      <Header>
        {recipient ? (
          <Avatar src={recipient.photoURL} alt="Recipient photo" />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient.lastSeen.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active ...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      {/* Messages */}
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={eneOfMessagesRef} />
      </MessageContainer>
      {/* Input */}
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          Send Message
        </button>
        {!input ? (
          <MicIcon />
        ) : (
          <SendIcon
            style={{ cursor: "pointer" }}
            onClick={(e) => sendMessage(e)}
          />
        )}
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  background-color: white;
  z-index: 90;
  top: 0;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  flex-grow: 1;
  margin-left: 15px;

  > h3 {
    font-size: 20px;
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 90;
`;

const Input = styled.input`
  flex-grow: 1;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
