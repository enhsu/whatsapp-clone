import { Avatar, IconButton, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "~/firebase";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "~/components/Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const chatsRef = collection(db, "chats");
  const userChatsRef = query(
    chatsRef,
    where("users", "array-contains", user?.email)
  );
  const [userChatsSnapshot] = useCollection(userChatsRef);
  const signOut = () => {
    auth.signOut();
  };

  const chatAlreadyExists: (recipientEmail: string) => boolean = (
    recipientEmail: string
  ): boolean => {
    return !!userChatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: string) => user === recipientEmail)
          ?.length > 0
    );
  };

  const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    if (
      user &&
      user.email !== input &&
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input)
    ) {
      // We need to add the chat into the DB 'chats' collection
      const chatsData = {
        users: [user.email, input],
      };
      await addDoc(chatsRef, chatsData);
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL as string} alt="user avatar" />
        <IconsContainer>
          <IconButton onClick={async () => await createChat()}>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={() => signOut()}>
            <LogoutIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={async () => await createChat()}>
        Start a new chat
      </SidebarButton>

      {/* List of chats */}
      {userChatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.aside`
  flex-grow: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 15px;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex-grow: 1;

  ::placeholder {
    color: gray;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
