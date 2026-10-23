import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PageMotion } from "@/components/PageMotion";

const appleGaramond = localFont({
    src: [
        {
            path: "../public/fonts/AppleGaramond.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/AppleGaramond-Italic.ttf",
            weight: "400",
            style: "italic",
        },
    ],
    variable: "--font-garamond",
    display: "swap",
});

const bricolageGrotesque = localFont({
    src: [
        {
            path: "../public/fonts/Bricolage Grotesque Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Bricolage Grotesque Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Bricolage Grotesque Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-bricolage",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BEM UMN | GEN XVI",
    description:
        "Official Website of BEM UMN GEN XVI — Inclusive for Innovation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body
                className={`${appleGaramond.variable} ${bricolageGrotesque.variable} antialiased`}
            >
                {children}
                <PageMotion />
            </body>
        </html>
    );
}
