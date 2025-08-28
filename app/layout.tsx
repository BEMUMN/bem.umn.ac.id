import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const lora = Lora({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-lora",
});

export const metadata: Metadata = {
    title: "BEM UMN | GEN XV",
    description: "Official Website of BEM UMN GEN XV",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${lora.variable} no-select antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
