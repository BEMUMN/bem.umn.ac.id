import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import RouteEffects from "@/components/RouteEffects";
import "./globals.css";

const newsreader = localFont({ src: "../public/fonts/redesign/newsreader-latin.woff2", variable: "--font-newsreader", display: "swap", weight: "400 600" });
const bricolage = localFont({ src: "../public/fonts/redesign/bricolage-grotesque-latin.woff2", variable: "--font-bricolage", display: "swap", weight: "400 700" });

export const metadata: Metadata = {
    metadataBase: new URL("https://bem.umn.ac.id"),
    title: "BEM UMN | GEN XVI",
    description: "Official Website of BEM UMN GEN XVI — Inclusive for Innovation",
    openGraph: { title: "BEM UMN | GEN XVI", description: "Official Website of BEM UMN GEN XVI — Inclusive for Innovation", images: [{ url: "/images/social/home.png", width: 1200, height: 630, alt: "BEM UMN Generasi XVI — Inclusive for Innovation" }], locale: "id_ID", type: "website" },
    twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#eee5d9" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="id"><body className={`${newsreader.variable} ${bricolage.variable}`}><a className="skip-link" href="#main-content">Langsung ke konten</a><RouteEffects />{children}</body></html>;
}
