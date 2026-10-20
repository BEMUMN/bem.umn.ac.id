export type Member = {
    id?: string;
    name: string;
    role: string;
    divisionId?: DivisionKey;
    imageUrl?: string;
    nim?: string;
    major?: string;
    quote?: string;
    instagram?: string;
    email?: string;
    linkedin?: string;
};

export type DivisionKey = "BPH" | "SUKM" | "SUFAK" | "SULSO" | "PR" | "SUKMA";

export const divisionMembers: Record<DivisionKey, Member[]> = {
    BPH: [
        {
            name: "Josephin Narumi S.",
            role: "Ketua",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Caroline Sandra C.",
            role: "Wakil Ketua",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Nicho Febrianto",
            role: "Sekretaris Bendahara 1",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Ranita Ivana Kols",
            role: "Sekretaris Bendahara 2",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],


    SUKM: [
        {
            name: "Fransiscus NJ Marco",
            role: "SUKM Sains & Sosial",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Nobel Joseph T.",
            role: "SUKM Olahraga",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Zahra Ariestya",
            role: "SUKM Seni Budaya 1",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Asri Ainun Utami",
            role: "SUKM Seni Budaya 2",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],

    SUFAK: [
        {
            name: "Rafly Tandean",
            role: "SUFAK I'MKOM & FSD",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Valerie Oryza",
            role: "SUFAK Teknik & Informatika",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Helen Christian",
            role: "SUFAK Bisnis",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],

    SULSO: [
        {
            name: "M. Kynan Khalfani",
            role: "Supervisor LSO",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],

    PR: [
        {
            name: "Velice Cathrina C.",
            role: "PR Internal 1",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Josyca Nauli P.",
            role: "PR Internal 2",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Kevin Lim",
            role: "PR Eksternal 1",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Excellin Alodia Joy",
            role: "PR Eksternal 2",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],

    SUKMA: [
        {
            name: "Sonny Ferdinand",
            role: "SUKMA MAXIMA",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Vassel Goleyu",
            role: "SUKMA Mister & Miss UMN",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Cornellius Susanto",
            role: "SUKMA UMN Festival",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Hanna Pauline H.",
            role: "SUKMA Starlight",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Selena Clarisa L.",
            role: "SUKMA UMN ECO",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
        {
            name: "Gven Carrey Gunawan",
            role: "SUKMA OMB UMN",
            imageUrl: "/pngs/members/anggota/tes_foto_anggota.webp",
        },
    ],
};
