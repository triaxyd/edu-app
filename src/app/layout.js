import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'JS Learning App',
  description: 'Learn JavaScript interactively',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full relative bg-white`}
      >
        {/* Background Grid + Light Glow */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* App Content */}
        <AuthProvider>
          <div className="relative z-10">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
