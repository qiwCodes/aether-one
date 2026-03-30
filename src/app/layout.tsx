import type { Metadata } from "next";
import { Cormorant, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import "./globals.css";

const heading = Cormorant({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aether One — Immersive sound, refined",
  description:
    "Aether One. Premium wireless over-ear headphones. Spatial audio, adaptive silence, and precision comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <SmoothScroll>
          <AmbientBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
