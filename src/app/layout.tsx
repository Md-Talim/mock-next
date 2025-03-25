import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MockNext",
  description: "Next-level mock interview experience.",
};

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} pattern antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default AppLayout;
