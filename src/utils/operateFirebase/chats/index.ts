import messages from "./messages/index";

const REST = (chatId: string) => ({
  messages: messages(chatId),
});

export default REST;
