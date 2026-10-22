export type Member = {
    id?: string;
    name: string;
    role: string;
    divisionId?: DivisionKey;
    imageUrl?: string;
    photos?: string[];
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
            name: "Josephin Narumi Setiawan",
            role: "Ketua",
            imageUrl:
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02.webp",
            photos: [
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02.webp",
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-14.webp",
            ],
        },
        {
            name: "Caroline Sandra Chen",
            role: "Wakil Ketua",
            imageUrl: "/pngs/members/anggota/bph/caroline-sandra-chen-02.webp",
            photos: [
                "/pngs/members/anggota/bph/caroline-sandra-chen-02.webp",
                "/pngs/members/anggota/bph/caroline-sandra-chen-06.webp",
            ],
        },
        {
            name: "Nicho Febrianto",
            role: "Sekretaris Bendahara 1",
            imageUrl: "/pngs/members/anggota/bph/nicho-febrianto-01.webp",
            photos: [
                "/pngs/members/anggota/bph/nicho-febrianto-01.webp",
                "/pngs/members/anggota/bph/nicho-febrianto-03.webp",
            ],
        },
        {
            name: "Ranita Ivana Kols",
            role: "Sekretaris Bendahara 2",
            imageUrl: "/pngs/members/anggota/bph/ranita-ivana-kols-01.webp",
            photos: [
                "/pngs/members/anggota/bph/ranita-ivana-kols-01.webp",
                "/pngs/members/anggota/bph/ranita-ivana-kols-03.webp",
            ],
        },
    ],

    SUKM: [
        {
            name: "Fransiscus Natadhika Joe Marco",
            role: "SUKM Sains & Sosial",
            imageUrl:
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01.webp",
            photos: [
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01.webp",
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-04.webp",
            ],
        },
        {
            name: "Nobel Joseph Taroreh",
            role: "SUKM Olahraga",
            imageUrl: "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01.webp",
            photos: [
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01.webp",
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-07.webp",
            ],
        },
        {
            name: "Zahra Ariestya Sennova",
            role: "SUKM Seni Budaya 1",
            imageUrl:
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01.webp",
            photos: [
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01.webp",
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-03.webp",
            ],
        },
        {
            name: "Asri Ainun Utami",
            role: "SUKM Seni Budaya 2",
            imageUrl: "/pngs/members/anggota/sukm/asri-ainun-utami-01.webp",
            photos: [
                "/pngs/members/anggota/sukm/asri-ainun-utami-01.webp",
                "/pngs/members/anggota/sukm/asri-ainun-utami-03.webp",
            ],
        },
    ],

    SUFAK: [
        {
            name: "Rafly Tandean",
            role: "SUFAK I'MKOM & FSD",
            imageUrl: "/pngs/members/anggota/sufak/rafly-tandean-04.webp",
            photos: [
                "/pngs/members/anggota/sufak/rafly-tandean-04.webp",
                "/pngs/members/anggota/sufak/rafly-tandean-06.webp",
            ],
        },
        {
            name: "Valerie Oryza Gunawan",
            role: "SUFAK Teknik & Informatika",
            imageUrl:
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01.webp",
            photos: [
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01.webp",
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-02.webp",
            ],
        },
        {
            name: "Helen Christian Effendi",
            role: "SUFAK Bisnis",
            imageUrl:
                "/pngs/members/anggota/sufak/helen-christian-effendi-01.webp",
            photos: [
                "/pngs/members/anggota/sufak/helen-christian-effendi-01.webp",
                "/pngs/members/anggota/sufak/helen-christian-effendi-04.webp",
            ],
        },
    ],

    SULSO: [
        {
            name: "Muhammad Kynan Khalfani",
            role: "Supervisor LSO",
            imageUrl:
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01.webp",
            photos: [
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01.webp",
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-04.webp",
            ],
        },
    ],

    PR: [
        {
            name: "Velice Cathrina Chan",
            role: "PR Internal 1",
            imageUrl: "/pngs/members/anggota/pr/velice-cathrina-chan-01.webp",
            photos: ["/pngs/members/anggota/pr/velice-cathrina-chan-01.webp"],
        },
        {
            name: "Josyca Nauli P.",
            role: "PR Internal 2",
        },
        {
            name: "Kevin Lim",
            role: "PR Eksternal 1",
            imageUrl: "/pngs/members/anggota/pr/kevin-lim-01.webp",
            photos: [
                "/pngs/members/anggota/pr/kevin-lim-01.webp",
                "/pngs/members/anggota/pr/kevin-lim-07.webp",
            ],
        },
        {
            name: "Excellin Alodia Joymarlin",
            role: "PR Eksternal 2",
            imageUrl:
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01.webp",
            photos: [
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01.webp",
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-03.webp",
            ],
        },
    ],

    SUKMA: [
        {
            name: "Sonny Ferdinand",
            role: "SUKMA MAXIMA",
            imageUrl: "/pngs/members/anggota/sukma/sonny-ferdinand-01.webp",
            photos: [
                "/pngs/members/anggota/sukma/sonny-ferdinand-01.webp",
                "/pngs/members/anggota/sukma/sonny-ferdinand-03.webp",
            ],
        },
        {
            name: "Vassel Goleyu",
            role: "SUKMA Mister & Miss UMN",
            imageUrl: "/pngs/members/anggota/sukma/vassel-goleyu-01.webp",
            photos: [
                "/pngs/members/anggota/sukma/vassel-goleyu-01.webp",
                "/pngs/members/anggota/sukma/vassel-goleyu-05.webp",
            ],
        },
        {
            name: "Cornellius Susanto",
            role: "SUKMA UMN Festival",
            imageUrl: "/pngs/members/anggota/sukma/cornellius-susanto-01.webp",
            photos: [
                "/pngs/members/anggota/sukma/cornellius-susanto-01.webp",
                "/pngs/members/anggota/sukma/cornellius-susanto-04.webp",
            ],
        },
        {
            name: "Hanna Pauline Haryono",
            role: "SUKMA Starlight",
            imageUrl:
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02.webp",
            photos: [
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02.webp",
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-06.webp",
            ],
        },
        {
            name: "Selena Clarisa Lesmana",
            role: "SUKMA UMN ECO",
            imageUrl:
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01.webp",
            photos: [
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01.webp",
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-03.webp",
            ],
        },
        {
            name: "Gven Carrey Gunawan",
            role: "SUKMA OMB UMN",
            imageUrl: "/pngs/members/anggota/sukma/gven-carrey-gunawan-01.webp",
            photos: [
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-07.webp",
            ],
        },
    ],
};
