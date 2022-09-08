# Dev progress

## Setup environment

1. Build project by [Next.js](https://nextjs.org/docs/basic-features/typescript)
1. Install[styled-component](https://styled-components.com/)
   - Also [styled-component with typescript](https://blog.logrocket.com/using-styled-components-in-typescript-a-tutorial-with-examples/#:~:text=What%20is%20styled%2Dcomponents%3F,learn%20a%20new%20styling%20structure)
1. Install [material-ui](https://mui.com/material-ui/getting-started/installation/)
   - Also, [material-ui with typescript](https://mui.com/material-ui/guides/typescript/)
1. [Setup vscode](./../Environment/vscode.md)
1. [Setup firebase](./../Environment/firebase.md)

## Implement

1. Create [components: Sidebar](./components/Sidebar.init.tsx)
   - Install [email-validator](https://www.npmjs.com/package/email-validator)
   - After check the email is validate, we need to add the email to DB 'chats' collection, before that, we need to know which user is login. We use [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks)
1. Update [\_app.tsx](./pages/_app.login.tsx)
   - Handle `Login` & `Loading`
   - Router authentication
   - [Async in UseEffect](./../Code/react.md)
1. Create [pages: login](./pages/login/index.init.tsx)
1. Create [components: Loading](./components/Loading.init.tsx)
   - use [react-spinners](https://www.npmjs.com/package/react-spinners) for loading circle
1. Create [components: Chat](./components/Chat.init.tsx)
   - Which is in [component: Sidebar](./components/Sidebar.add.chat.tsx), listing the chat rooms
1. Create [pages: `chat/[id]`](./pages/chat/%5Bid%5D.init.tsx)
   - Router result of the `onClick` event in [components: Chat](./components/Chat.init.tsx)
   - Displaying the right side chat room
1. Create [components: ChatScreen](./components/ChatScreen.init.tsx)
   - Which is in [pages: `chat/[id]`](./pages/chat/%5Bid%5D.init.tsx)
   - use [timeago-react](https://www.npmjs.com/package/timeago-react) for `last seen ... time ago`
1. Create [components: Message](./components/Message.init.tsx)
   - use [moment](https://www.npmjs.com/package/moment) for message timestamp

## Deployment

1. Push repocitory to github
1. Go to [Vercel](https://vercel.com/)
   - Create a new project
   - Connect the project to the github repocitory
   - It will deploye automatically, get the domain after it done
1. Go to [Firebase](https://firebase.google.com/)
   - Go to `Build` > `Authentication` > `Setting` > `Authorized domains`
   - Add the `Vercel domain` to it
