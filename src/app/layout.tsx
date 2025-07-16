import "~/styles/globals.css";
import NavBar from "./_components/_general/NavBar";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { AuthContextProvider,  } from "~/context/AuthContext";
import ProtectedContent from "./Protected";

export const metadata: Metadata = {
  title: "CommunoLearn",
  description: "CommunoLearn Web, Communities getting things done!",
  icons: [{ rel: "icon", url: "/plan-28.svg" }],
};




export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <AuthContextProvider>
            <NavBar />
            <ProtectedContent>{children}</ProtectedContent>
          </AuthContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
