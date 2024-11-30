import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "White Box",
  description: "Throw you thoughts into the void",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <div className="py-5">
            <div className="px-4">
              <div className="flex items-center font-bold">
                <div className="rounded-xl border-2 border-black px-2 py-1">
                  White Box
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
