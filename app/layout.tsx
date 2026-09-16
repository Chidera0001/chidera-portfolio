import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BookACall } from "@/components/BookACall";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chidera Anele · Product Engineer",
  description:
    "Chidera (Dera) Anele — product engineer in Kigali, Rwanda building fintech, logistics, civic-tech, and AI-enabled products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <CustomCursor />
          {children}
          <BookACall />
        </ThemeProvider>
      </body>
    </html>
  );
}
