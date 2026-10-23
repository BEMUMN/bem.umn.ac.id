export type Member = {
    id?: string;
    name: string;
    nickname?: string;
    role: string;
    divisionId?: DivisionKey;
    imageUrl?: string;
    portraitCrop?: { x: number; y: number; width: number };
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
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02-v2-studio.webp",
            portraitCrop: { x: 93, y: 95, width: 585 },
            photos: [
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02-v2-studio.webp",
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
            portraitCrop: { x: 203, y: 121, width: 470 },
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
            portraitCrop: { x: 181, y: 120, width: 530 },
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
            portraitCrop: { x: 166, y: 124, width: 456 },
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
            portraitCrop: { x: 157, y: 118, width: 505 },
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
            portraitCrop: { x: 155, y: 82, width: 473 },
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
            portraitCrop: { x: 136, y: 122, width: 516 },
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
            portraitCrop: { x: 108, y: 93, width: 567 },
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
            portraitCrop: { x: 160, y: 113, width: 499 },
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
            portraitCrop: { x: 125, y: 95, width: 546 },
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
            portraitCrop: { x: 143, y: 148, width: 478 },
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
            portraitCrop: { x: 150, y: 155, width: 481 },
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
            portraitCrop: { x: 181, y: 183, width: 481 },
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
            portraitCrop: { x: 150, y: 120, width: 476 },
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
            portraitCrop: { x: 144, y: 116, width: 496 },
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
            portraitCrop: { x: 160, y: 145, width: 500 },
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
            portraitCrop: { x: 173, y: 201, width: 456 },
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
            portraitCrop: { x: 172, y: 145, width: 504 },
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
            portraitCrop: { x: 131, y: 200, width: 475 },
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
            portraitCrop: { x: 176, y: 120, width: 505 },
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
            portraitCrop: { x: 132, y: 116, width: 522 },
            photos: [
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01-studio.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-07.webp",
            ],
        },
    ],
};
