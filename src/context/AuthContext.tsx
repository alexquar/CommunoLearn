"use client";

import { createContext, useContext, type ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth_app } from "~/config";
import { api } from "~/trpc/react";
import type { UserWithRelations } from "../types/userTypes";
import Loading from "~/app/loading";
export const AuthContext = createContext<{ 
  user: UserWithRelations | null;
  token: string | null;
  setToken: (token: string | null) => void;
}>({ user: null, token: null, setToken: (_token) => {
  console.warn('setToken was called outside of AuthContextProvider');
} });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const trpc = api.useUtils();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth_app, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser?.email) {
        // firebaseUser.getIdToken().then((idToken) => {
        //   let providerData = firebaseUser.providerData.find((provider) => provider.providerId === "google.com");
        //   let accessToken = (firebaseUser as any)?.stsTokenManager?.accessToken || null
        // }).catch((error) => {
        //   console.error("Error getting ID token:", error);
        //   setToken(null);
        // }
        // );
        trpc.user.getUserByEmailWithRelations.fetch({email:firebaseUser.email}) // Refetch with the email
          .then((result) => {
            if (result) {
              setUser(result); // Update user state
            } else {
              setUser(null);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [trpc]);

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
