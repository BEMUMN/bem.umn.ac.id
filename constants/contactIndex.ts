export interface SocialLink {
    id: string;
    name: string;
    handle: string;
    href: string;
    isPlaceholder: boolean;
    ariaLabel: string;
}

export interface DirectChannel {
    id: string;
    name: string;
    value: string;
    href?: string;
    isPlaceholder: boolean;
    ariaLabel: string;
}

export interface ContactConfig {
    organization: string;
    cabinet: string;
    tagline: string;
    description: string;
    address: {
        campus: string;
        street: string;
        area: string;
        city: string;
        full: string;
        mapUrl: string;
    };
    socials: SocialLink[];
    channels: DirectChannel[];
}

export const contactConfig: ContactConfig = {
    organization: "Badan Eksekutif Mahasiswa",
    cabinet: "Generasi XVI",
    tagline: "#InclusiveForInnovation",
    description:
        "Lembaga eksekutif mahasiswa tertinggi di tingkat universitas, mengabdi dan bergerak bersama KBM Universitas Multimedia Nusantara.",
    address: {
        campus: "Universitas Multimedia Nusantara",
        street: "Jl. Scientia Boulevard, Gading Serpong",
        area: "Kel. Curug Sangereng, Kec. Kelapa Dua",
        city: "Kab. Tangerang, Banten 15810, Indonesia",
        full: "Jl. Scientia Boulevard, Gading Serpong, Kel. Curug Sangereng, Kec. Kelapa Dua, Kab. Tangerang, Banten 15810, Indonesia",
        mapUrl: "https://maps.google.com/?q=Universitas+Multimedia+Nusantara",
    },
    socials: [
        {
            id: "instagram",
            name: "Instagram",
            handle: "@bemumn",
            href: "https://www.instagram.com/bemumn?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==",
            isPlaceholder: false,
            ariaLabel: "Buka Instagram resmi BEM UMN di tab baru",
        },
        {
            id: "linkedin",
            name: "LinkedIn",
            handle: "BEM UMN",
            href: "https://www.linkedin.com/company/bem-umn/home/",
            isPlaceholder: false,
            ariaLabel: "Buka LinkedIn resmi BEM UMN di tab baru",
        },
        {
            id: "tiktok",
            name: "TikTok",
            handle: "Segera Hadir",
            href: "#",
            isPlaceholder: true,
            ariaLabel: "TikTok BEM UMN (Segera Hadir)",
        },
        {
            id: "facebook",
            name: "Facebook",
            handle: "Segera Hadir",
            href: "#",
            isPlaceholder: true,
            ariaLabel: "Facebook BEM UMN (Segera Hadir)",
        },
    ],
    channels: [
        {
            id: "line",
            name: "LINE Official",
            value: "Segera Hadir",
            isPlaceholder: true,
            ariaLabel: "LINE Official BEM UMN (Segera Hadir)",
        },
        {
            id: "email",
            name: "Email Resmi",
            value: "Segera Hadir",
            isPlaceholder: true,
            ariaLabel: "Email resmi BEM UMN (Segera Hadir)",
        },
        {
            id: "whatsapp",
            name: "WhatsApp Helpdesk",
            value: "Segera Hadir",
            isPlaceholder: true,
            ariaLabel: "WhatsApp Helpdesk BEM UMN (Segera Hadir)",
        },
    ],
};

