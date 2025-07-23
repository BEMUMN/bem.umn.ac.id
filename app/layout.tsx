import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./globals.css";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const openSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
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
				className={`${openSans} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
