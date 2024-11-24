"use client";

import { createContext, useContext, type ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth_app } from "~/config";
import { api } from "~/trpc/react";
import type { UserWithRelations } from "../types/userTypes";

// Create the Auth Context
export const AuthContext = createContext<{ user: UserWithRelations | null }>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  const trpc = api.useUtils();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth_app, (firebaseUser) => {
      if (firebaseUser?.email) {
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
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
