# Setup firebase

## Project setting

- [Reference: Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
- [Q&A: firebase with typescript](https://stackoverflow.com/questions/44220327/firebase-admin-with-typescript-in-firebase-cloud-functions)

1. `$yarn add firebase`

## Console setting

1. Go to [Firebase](https://firebase.google.com/)
1. Right top, `Go to console`
1. Create a project
   - Named it: "whatsapp-clone"
   - Turn off the google analytics(turn on if you want)

### Get configuration content

- [Reference: Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)

1. Go to [Firebase](https://firebase.google.com/)
1. Right top, `Go to console`
1. Select the project
1. On the left top, clicke the `Gear icon` > `Project setting`
1. In `General` tab, scroll down to `Your apps`, click `web platform`(the `</>` icon)
   - Fill up the project name: "whatsapp-clone"
   - Keep `Also set up Firebase Hosting for this app.` NOT check
   - After it done, click `Continue to console`
1. Then go back to `Project settings` > `General` tab
   - Scroll down to `Your apps`, we'll see the web app we just registered
   - At `SDK setup and configuration`, click the `Config` radio
   - We get the "firebase config" we need, that we can use it to initialize firebase app in our project
1. [connect to firebase database demo](./../Demo/connect-to-firebase.ts)

### Create a firestore database

1. Go to [Firebase](https://firebase.google.com/)
1. Right top, `Go to console`
1. Select the project
1. On the left panel > Build > click `Firestore Database`
1. Click `Create database`
1. Test mode will be fine

### Authentication setting

- [Reference: Firebase Authentication](https://firebase.google.com/docs/auth)
- [Reference: Authenticate Using Google with JavaScript](https://firebase.google.com/docs/auth/web/google-signin)

1. Go to [Firebase](https://firebase.google.com/)
1. Right top, `Go to console`
1. Select the project
1. On the left panel > Build > click `Authentication`
1. Click `Get started`
1. At `Additional providers`
   - Click `Google`, and enable it
   - Don't forget select the `Project support email`
   - Click `Save`
   <!-- 1. After Save is done, go `Authentication` > `Sign-in method` > `Sign-in providers` > `Google` > `Web SDK configuration`
   - `Web client ID` as `GOOGLE_CLIENT_ID`
   - `Web client secret` as `GOOGLE_CLIENT_SECRET`. P.S. make it save, don't show anyone :)
   - copy these two information to `.env.local` in our project -->

## Use the hooks

- [Reference: React Firebase Hooks - Auth](https://github.com/csfrequency/react-firebase-hooks/tree/edab3f3f3b5ec01c8aafcc6096755dfcc69e4408/auth)
