import { createContext, useContext, useEffect, useState } from "react";
import {
  OAuthCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  User,
} from "firebase/auth";
import { firebase_auth } from "@modules/firebase";
import { setCookie, getCookie, hasCookie, deleteCookie} from "cookies-next";
import { Snackbar } from "@mui/material";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
      if (user) {
        setUser(user);

        let twitterCredentialCookie = null;
        if (hasCookie("twitter_access_token") && hasCookie("twitter_secret")) {
          const accessToken = getCookie("twitter_access_token")!.toString();
          const secret = getCookie("twitter_secret")!.toString();
          twitterCredentialCookie = TwitterAuthProvider.credential(
            accessToken,
            secret
          );
        }
        setCredential(twitterCredentialCookie);
      } else {
        setUser(null);
        setCredential(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(firebase_auth, provider);
    if (result.user) {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const secret = credential?.secret;

      setCredential(credential);
      setCookie("twitter_access_token", accessToken);
      setCookie("twitter_secret", secret);
    }
    return result;
  };

  const logout = async () => {
    setUser(null);
    setCredential(null);
    deleteCookie("twitter_access_token");
    deleteCookie("twitter_secret")
    await signOut(firebase_auth);
  };

  return (
    <AuthContext.Provider value={{ user, credential, logout, login }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
