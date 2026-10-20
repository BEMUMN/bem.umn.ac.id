import type { Metadata } from "next";
import TentangKamiContent from "@/components/TentangKamiContent";

export const metadata: Metadata = {
    openGraph: { title: "Tentang Kami | BEM UMN GEN XVI", images: [{ url: "/images/social/tentang-kami.png", width: 1200, height: 630 }] },
    title: "Tentang Kami | BEM UMN GEN XVI",
    description:
        "Monograf resmi, visi, misi, filosofi logo Folded Paper XVI, nilai supergrafik, dan struktur divisi Badan Eksekutif Mahasiswa Universitas Multimedia Nusantara Generasi XVI.",
};

export default function TentangKamiPage() {
    return <TentangKamiContent />;
}
