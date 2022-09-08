import { addMessage } from "./post";

const REST = (chatId: string) => ({
  post: addMessage(chatId),
});

export default REST;
