export type Member = {
    id?: string;
    name: string;
    nickname?: string;
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
            nickname: "Josephin",
            role: "Ketua",
            imageUrl:
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02-studio.webp",
            photos: [
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02-studio.webp",
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02.webp",
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-14.webp",
            ],
        },
        {
            name: "Caroline Sandra Chen",
            nickname: "Caroline",
            role: "Wakil Ketua",
            imageUrl:
                "/pngs/members/anggota/bph/caroline-sandra-chen-02-studio.webp",
            photos: [
                "/pngs/members/anggota/bph/caroline-sandra-chen-02-studio.webp",
                "/pngs/members/anggota/bph/caroline-sandra-chen-02.webp",
                "/pngs/members/anggota/bph/caroline-sandra-chen-06.webp",
            ],
        },
        {
            name: "Nicho Febrianto",
            nickname: "Nicho",
            role: "Sekretaris Bendahara 1",
            imageUrl:
                "/pngs/members/anggota/bph/nicho-febrianto-01-studio.webp",
            photos: [
                "/pngs/members/anggota/bph/nicho-febrianto-01-studio.webp",
                "/pngs/members/anggota/bph/nicho-febrianto-01.webp",
                "/pngs/members/anggota/bph/nicho-febrianto-03.webp",
            ],
        },
        {
            name: "Ranita Ivana Kols",
            nickname: "Ranita",
            role: "Sekretaris Bendahara 2",
            imageUrl:
                "/pngs/members/anggota/bph/ranita-ivana-kols-01-studio.webp",
            photos: [
                "/pngs/members/anggota/bph/ranita-ivana-kols-01-studio.webp",
                "/pngs/members/anggota/bph/ranita-ivana-kols-01.webp",
                "/pngs/members/anggota/bph/ranita-ivana-kols-03.webp",
            ],
        },
    ],

    SUKM: [
        {
            name: "Fransiscus Natadhika Joe Marco",
            nickname: "Fransiscus",
            role: "SUKM Sains & Sosial",
            imageUrl:
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01-studio.webp",
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01.webp",
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-04.webp",
            ],
        },
        {
            name: "Nobel Joseph Taroreh",
            nickname: "Nobel",
            role: "SUKM Olahraga",
            imageUrl:
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01-studio.webp",
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01.webp",
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-07.webp",
            ],
        },
        {
            name: "Zahra Ariestya Sennova",
            nickname: "Zahra",
            role: "SUKM Seni Budaya 1",
            imageUrl:
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01-studio.webp",
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01.webp",
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-03.webp",
            ],
        },
        {
            name: "Asri Ainun Utami",
            nickname: "Asri",
            role: "SUKM Seni Budaya 2",
            imageUrl:
                "/pngs/members/anggota/sukm/asri-ainun-utami-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukm/asri-ainun-utami-01-studio.webp",
                "/pngs/members/anggota/sukm/asri-ainun-utami-01.webp",
                "/pngs/members/anggota/sukm/asri-ainun-utami-03.webp",
            ],
        },
    ],

    SUFAK: [
        {
            name: "Rafly Tandean",
            nickname: "Rafly",
            role: "SUFAK I'MKOM & FSD",
            imageUrl:
                "/pngs/members/anggota/sufak/rafly-tandean-04-studio.webp",
            photos: [
                "/pngs/members/anggota/sufak/rafly-tandean-04-studio.webp",
                "/pngs/members/anggota/sufak/rafly-tandean-04.webp",
                "/pngs/members/anggota/sufak/rafly-tandean-06.webp",
            ],
        },
        {
            name: "Valerie Oryza Gunawan",
            nickname: "Valerie",
            role: "SUFAK Teknik & Informatika",
            imageUrl:
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01-studio.webp",
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01.webp",
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-02.webp",
            ],
        },
        {
            name: "Helen Christian Effendi",
            nickname: "Helen",
            role: "SUFAK Bisnis",
            imageUrl:
                "/pngs/members/anggota/sufak/helen-christian-effendi-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sufak/helen-christian-effendi-01-studio.webp",
                "/pngs/members/anggota/sufak/helen-christian-effendi-01.webp",
                "/pngs/members/anggota/sufak/helen-christian-effendi-04.webp",
            ],
        },
    ],

    SULSO: [
        {
            name: "Muhammad Kynan Khalfani",
            nickname: "Muhammad",
            role: "Supervisor LSO",
            imageUrl:
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01-studio.webp",
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01.webp",
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-04.webp",
            ],
        },
    ],

    PR: [
        {
            name: "Velice Cathrina Chan",
            nickname: "Velice",
            role: "PR Internal 1",
            imageUrl:
                "/pngs/members/anggota/pr/velice-cathrina-chan-01-studio.webp",
            photos: [
                "/pngs/members/anggota/pr/velice-cathrina-chan-01-studio.webp",
                "/pngs/members/anggota/pr/velice-cathrina-chan-01.webp",
            ],
        },
        {
            name: "Josyca Nauli P.",
            nickname: "Josyca",
            role: "PR Internal 2",
        },
        {
            name: "Kevin Lim",
            nickname: "Kevin",
            role: "PR Eksternal 1",
            imageUrl: "/pngs/members/anggota/pr/kevin-lim-01-studio.webp",
            photos: [
                "/pngs/members/anggota/pr/kevin-lim-01-studio.webp",
                "/pngs/members/anggota/pr/kevin-lim-01.webp",
                "/pngs/members/anggota/pr/kevin-lim-07.webp",
            ],
        },
        {
            name: "Excellin Alodia Joymarlin",
            nickname: "Excellin",
            role: "PR Eksternal 2",
            imageUrl:
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01-studio.webp",
            photos: [
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01-studio.webp",
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01.webp",
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-03.webp",
            ],
        },
    ],

    SUKMA: [
        {
            name: "Sonny Ferdinand",
            nickname: "Sonny",
            role: "SUKMA MAXIMA",
            imageUrl:
                "/pngs/members/anggota/sukma/sonny-ferdinand-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/sonny-ferdinand-01-studio.webp",
                "/pngs/members/anggota/sukma/sonny-ferdinand-01.webp",
                "/pngs/members/anggota/sukma/sonny-ferdinand-03.webp",
            ],
        },
        {
            name: "Vassel Goleyu",
            nickname: "Vassel",
            role: "SUKMA Mister & Miss UMN",
            imageUrl:
                "/pngs/members/anggota/sukma/vassel-goleyu-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/vassel-goleyu-01-studio.webp",
                "/pngs/members/anggota/sukma/vassel-goleyu-01.webp",
                "/pngs/members/anggota/sukma/vassel-goleyu-05.webp",
            ],
        },
        {
            name: "Cornellius Susanto",
            nickname: "Cornellius",
            role: "SUKMA UMN Festival",
            imageUrl:
                "/pngs/members/anggota/sukma/cornellius-susanto-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/cornellius-susanto-01-studio.webp",
                "/pngs/members/anggota/sukma/cornellius-susanto-01.webp",
                "/pngs/members/anggota/sukma/cornellius-susanto-04.webp",
            ],
        },
        {
            name: "Hanna Pauline Haryono",
            nickname: "Hanna",
            role: "SUKMA Starlight",
            imageUrl:
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02-studio.webp",
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02.webp",
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-06.webp",
            ],
        },
        {
            name: "Selena Clarisa Lesmana",
            nickname: "Selena",
            role: "SUKMA UMN ECO",
            imageUrl:
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01-studio.webp",
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01.webp",
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-03.webp",
            ],
        },
        {
            name: "Gven Carrey Gunawan",
            nickname: "Gven",
            role: "SUKMA OMB UMN",
            imageUrl:
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01-studio.webp",
            photos: [
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01-studio.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-07.webp",
            ],
        },
    ],
};
