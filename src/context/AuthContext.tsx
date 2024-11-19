"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth_app } from "~/config";
import { type User } from "firebase/auth"

export const AuthContext = createContext<{ user: User | null }>({ user: null })

export const useAuthContext = () => useContext(AuthContext)


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth_app, (user) => {
        setUser(user)
        setLoading(false)
        })
    
        return unsubscribe
    }, [])
    
    return (
        <AuthContext.Provider value={{ user }}>
        {!loading && children}
        </AuthContext.Provider>
    )
    }