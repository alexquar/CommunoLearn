
import "~/styles/globals.css";
import NavBar from "./_components/NavBar";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./providers";
import { getSession, SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "CommunoLearn",
  description: "CommunoLearn Web, Communities getting things done!",
  icons: [{ rel: "icon", url: "/plan-28.svg" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
const session = await getSession()
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers session={session}>
        <NavBar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
