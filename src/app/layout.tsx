
import "~/styles/globals.css";
import NavBar from "./_components/NavBar";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
export const metadata: Metadata = {
  title: "CommunoLearn",
  description: "CommunoLearn Web, Communities getting things done!",
  icons: [{ rel: "icon", url: "/plan-28.svg" }],
};
import { AuthContextProvider } from "~/context/AuthContext";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <AuthContextProvider>
        <NavBar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthContextProvider>

      </body>
    </html>
  );
}
