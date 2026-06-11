import type { Metadata } from "next";
import { Fira_Code, Lora, Montserrat, Nunito } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const firaCodeMono = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const loraSerif = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alloclinic",
  description: "Landing page frontend for Alloclinic.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${firaCodeMono.variable} ${loraSerif.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${nunitoSans.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
