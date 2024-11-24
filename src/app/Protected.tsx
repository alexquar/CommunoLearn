"use client";
import { useAuthContext } from "~/context/AuthContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
const protectedRoutes = ["/communities", "/myzone", "/meetings", "/profile", "/todos"];
const isProtectedRoute = (pathname: string) => {
    return protectedRoutes.some((route) => pathname.startsWith(route));
  };
  
export default function ProtectedContent({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext()
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      // Redirect to login if user is not authenticated
      if (!user && isProtectedRoute(pathname)) {
        router.push("/login");
      }

      if(user && (pathname === "/login" || pathname === "/signup")){
        router.push("/");
      }
      
    }, [user, router, pathname]);
  
    if (!user && isProtectedRoute(pathname)) {
      return <Loading />; // Show a loading spinner while redirecting
    }
  
    return <>{children}</>; // Render children if user is authenticated or route is not protected
  }