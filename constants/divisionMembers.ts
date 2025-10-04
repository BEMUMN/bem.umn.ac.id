export type Member = {
    name: string;
    role: string;
    imageUrl: string;
};

export type DivisionKey = "BPH" | "PR" | "SUKMA" | "SUFAK" | "SUKM" | "SULSO";

export const divisionMembers: Record<
    string,
    { name: string; role: string; imageUrl: string }[]
> = {
    BPH: [
        {
            name: "Septia Rosa Tambunan",
            role: "Ketua",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Kevin Lim",
            role: "Wakil Ketua",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Romi Andreas",
            role: "Sekretaris Bendahara I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Jonathan Cahyo Wisang Panjaitan",
            role: "Sekretaris Bendahara II",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],

    PR: [
        {
            name: "Prajna Ananda Citra",
            role: "PR Internal I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Jeanice Caroliine",
            role: "PR Internal II",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Andi Bintang Rihhadatul Aisy",
            role: "PR Eksternal I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Evelyn Tanata",
            role: "PR Eksternal II",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],

    SUKMA: [
        {
            name: "Edwin Valerio",
            role: "Supervisor MAXIMA 2025",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Phei In",
            role: "Supervisor Mister & Miss UMN 20255",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Valerie Onassis Halim",
            role: "Supervisor OMB UMN 2025",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Samuel Matthew Samadikun",
            role: "Supervisor UMN Festival 2025",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Angela Felicia Florenza",
            role: "Supervisor STARLIGHT 2025",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Ladya Azka",
            role: "Supervisor UMN ECO 2025",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],

    SUFAK: [
        {
            name: "Neisya Arsy Argya",
            role: "Supervisor Fakultas Bisnis",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Josephin Narumi Setiawan",
            role: "Supervisor Fakultas Teknik dan Informatika",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Indira Sukma Dewi",
            role: "Supervisor Fakultas Ilmu Komunikasi",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Gabriel Imanullah Putra Pribowo",
            role: "Supervisor Fakultas Seni dan Desain",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],

    SUKM: [
        {
            name: "El Jalaluddin Raaqi",
            role: "Supervisor UKM Olahraga I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Rafly Tandean",
            role: "Supervisor UKM Olahraga II",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Reynaldo",
            role: "Supersvisor UKM Sains dan Sosial",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Debian Vinca Mawangi",
            role: "Supervisor UKM Seni Budaya I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Keira Nicole Fu",
            role: "Supervisor UKM Seni Budaya II",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],

    SULSO: [
        {
            name: "Ibrahim Zaidan",
            role: "Supervisor Lembaga Semi Otonom dan Bazar I",
            imageUrl: "/pngs/gallery/###.png",
        },
        {
            name: "Nicho Febrianto",
            role: "Supervisor Lembaga Semi Otonom dan Bazar II",
            imageUrl: "/pngs/gallery/###.png",
        },
    ],
};
