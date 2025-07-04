import type { Metadata } from "next";
import "./globals.css";
import { openSans, orbitron } from "../functions/fonts";
import ClientToaster from "@/components/ClientToaster";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import BgWrapper from "@/components/bg-wrapper";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Yugioh | Project",
  description:
    "Plataforma de torneios para duelistas inspirada no universo do anime Yu-Gi-Oh!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-red-100 antialiase ${orbitron.variable} ${openSans.className} `}
      >
        <ReactQueryProvider>
          <main>
            <Header />
            <BgWrapper>{children}</BgWrapper>
            <ClientToaster />
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
