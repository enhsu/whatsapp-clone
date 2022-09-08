import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "~/firebase";
import Login from "~/pages/login";
import Loading from "~/components/Loading";
import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const updateUserInfo = async () => {
        try {
          const usersRef = doc(db, "users", user.uid);
          const userData = {
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: serverTimestamp(),
          };
          const option = {
            merge: true,
          };

          await setDoc(usersRef, userData, option);
        } catch (err) {
          throw err;
        }
      };

      updateUserInfo().catch(console.error);
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
