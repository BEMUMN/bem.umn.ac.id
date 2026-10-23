export type Member = {
    id?: string;
    name: string;
    nickname?: string;
    role: string;
    divisionId?: DivisionKey;
    imageUrl?: string;
    portraitCrop?: { x: number; y: number; width: number };
    gestureImageUrl?: string;
    gestureCrop?: { x: number; y: number; width: number };
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
            gestureImageUrl:
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-gesture-studio.webp",
            gestureCrop: { x: 131, y: 124, width: 526 },
            photos: [
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-02-v2-studio.webp",
                "/pngs/members/anggota/bph/josephin-narumi-setiawan-gesture-studio.webp",
            ],
        },
        {
            name: "Caroline Sandra Chen",
            nickname: "Caroline",
            role: "Wakil Ketua",
            imageUrl:
                "/pngs/members/anggota/bph/caroline-sandra-chen-02-studio.webp",
            portraitCrop: { x: 203, y: 121, width: 470 },
            gestureImageUrl:
                "/pngs/members/anggota/bph/caroline-sandra-chen-gesture-studio.webp",
            gestureCrop: { x: 182, y: 173, width: 474 },
            photos: [
                "/pngs/members/anggota/bph/caroline-sandra-chen-02-studio.webp",
                "/pngs/members/anggota/bph/caroline-sandra-chen-gesture-studio.webp",
            ],
        },
        {
            name: "Nicho Febrianto",
            nickname: "Nicho",
            role: "Sekretaris Bendahara 1",
            imageUrl:
                "/pngs/members/anggota/bph/nicho-febrianto-01-studio.webp",
            portraitCrop: { x: 181, y: 120, width: 530 },
            gestureImageUrl:
                "/pngs/members/anggota/bph/nicho-febrianto-gesture-studio.webp",
            gestureCrop: { x: 121, y: 143, width: 589 },
            photos: [
                "/pngs/members/anggota/bph/nicho-febrianto-01-studio.webp",
                "/pngs/members/anggota/bph/nicho-febrianto-gesture-studio.webp",
            ],
        },
        {
            name: "Ranita Ivana Kols",
            nickname: "Ranita",
            role: "Sekretaris Bendahara 2",
            imageUrl:
                "/pngs/members/anggota/bph/ranita-ivana-kols-01-studio.webp",
            portraitCrop: { x: 166, y: 124, width: 456 },
            gestureImageUrl:
                "/pngs/members/anggota/bph/ranita-ivana-kols-gesture-studio.webp",
            gestureCrop: { x: 151, y: 264, width: 480 },
            photos: [
                "/pngs/members/anggota/bph/ranita-ivana-kols-01-studio.webp",
                "/pngs/members/anggota/bph/ranita-ivana-kols-gesture-studio.webp",
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
            gestureImageUrl:
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-gesture-studio.webp",
            gestureCrop: { x: 171, y: 133, width: 473 },
            photos: [
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-01-studio.webp",
                "/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-gesture-studio.webp",
            ],
        },
        {
            name: "Nobel Joseph Taroreh",
            nickname: "Nobel",
            role: "SUKM Olahraga",
            imageUrl:
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01-studio.webp",
            portraitCrop: { x: 155, y: 82, width: 473 },
            gestureImageUrl:
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-gesture-studio.webp",
            gestureCrop: { x: 238, y: 190, width: 438 },
            photos: [
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-01-studio.webp",
                "/pngs/members/anggota/sukm/nobel-joseph-taroreh-gesture-studio.webp",
            ],
        },
        {
            name: "Zahra Ariestya Sennova",
            nickname: "Zahra",
            role: "SUKM Seni Budaya 1",
            imageUrl:
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01-studio.webp",
            portraitCrop: { x: 136, y: 122, width: 516 },
            gestureImageUrl:
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-gesture-studio.webp",
            gestureCrop: { x: 166, y: 123, width: 465 },
            photos: [
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-01-studio.webp",
                "/pngs/members/anggota/sukm/zahra-ariestya-sennova-gesture-studio.webp",
            ],
        },
        {
            name: "Asri Ainun Utami",
            nickname: "Asri",
            role: "SUKM Seni Budaya 2",
            imageUrl:
                "/pngs/members/anggota/sukm/asri-ainun-utami-01-studio.webp",
            portraitCrop: { x: 108, y: 93, width: 567 },
            gestureImageUrl:
                "/pngs/members/anggota/sukm/asri-ainun-utami-gesture-studio.webp",
            gestureCrop: { x: 32, y: 149, width: 597 },
            photos: [
                "/pngs/members/anggota/sukm/asri-ainun-utami-01-studio.webp",
                "/pngs/members/anggota/sukm/asri-ainun-utami-gesture-studio.webp",
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
            gestureImageUrl:
                "/pngs/members/anggota/sufak/rafly-tandean-gesture-studio.webp",
            gestureCrop: { x: 130, y: 133, width: 600 },
            photos: [
                "/pngs/members/anggota/sufak/rafly-tandean-04-studio.webp",
                "/pngs/members/anggota/sufak/rafly-tandean-gesture-studio.webp",
            ],
        },
        {
            name: "Valerie Oryza Gunawan",
            nickname: "Valerie",
            role: "SUFAK Teknik & Informatika",
            imageUrl:
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01-studio.webp",
            portraitCrop: { x: 125, y: 95, width: 546 },
            gestureImageUrl:
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-gesture-studio.webp",
            gestureCrop: { x: 140, y: 146, width: 543 },
            photos: [
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-01-studio.webp",
                "/pngs/members/anggota/sufak/valerie-oryza-gunawan-gesture-studio.webp",
            ],
        },
        {
            name: "Helen Christian Effendi",
            nickname: "Helen",
            role: "SUFAK Bisnis",
            imageUrl:
                "/pngs/members/anggota/sufak/helen-christian-effendi-01-studio.webp",
            portraitCrop: { x: 143, y: 148, width: 478 },
            gestureImageUrl:
                "/pngs/members/anggota/sufak/helen-christian-effendi-gesture-studio.webp",
            gestureCrop: { x: 159, y: 205, width: 436 },
            photos: [
                "/pngs/members/anggota/sufak/helen-christian-effendi-01-studio.webp",
                "/pngs/members/anggota/sufak/helen-christian-effendi-gesture-studio.webp",
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
            gestureImageUrl:
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-gesture-studio.webp",
            gestureCrop: { x: 50, y: 141, width: 700 },
            photos: [
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-01-studio.webp",
                "/pngs/members/anggota/sulso/muhammad-kynan-khalfani-gesture-studio.webp",
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
            gestureImageUrl:
                "/pngs/members/anggota/pr/kevin-lim-gesture-studio.webp",
            gestureCrop: { x: 209, y: 164, width: 372 },
            photos: [
                "/pngs/members/anggota/pr/kevin-lim-01-studio.webp",
                "/pngs/members/anggota/pr/kevin-lim-gesture-studio.webp",
            ],
        },
        {
            name: "Excellin Alodia Joymarlin",
            nickname: "Excellin",
            role: "PR Eksternal 2",
            imageUrl:
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01-studio.webp",
            portraitCrop: { x: 144, y: 116, width: 496 },
            gestureImageUrl:
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-gesture-studio.webp",
            gestureCrop: { x: 148, y: 147, width: 503 },
            photos: [
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-01-studio.webp",
                "/pngs/members/anggota/pr/excellin-alodia-joymarlin-gesture-studio.webp",
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
            gestureImageUrl:
                "/pngs/members/anggota/sukma/sonny-ferdinand-gesture-studio.webp",
            gestureCrop: { x: 25, y: 117, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/sonny-ferdinand-01-studio.webp",
                "/pngs/members/anggota/sukma/sonny-ferdinand-gesture-studio.webp",
            ],
        },
        {
            name: "Vassel Goleyu",
            nickname: "Vassel",
            role: "SUKMA Mister & Miss UMN",
            imageUrl:
                "/pngs/members/anggota/sukma/vassel-goleyu-01-studio.webp",
            portraitCrop: { x: 173, y: 201, width: 456 },
            gestureImageUrl:
                "/pngs/members/anggota/sukma/vassel-goleyu-gesture-studio.webp",
            gestureCrop: { x: 25, y: 89, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/vassel-goleyu-01-studio.webp",
                "/pngs/members/anggota/sukma/vassel-goleyu-gesture-studio.webp",
            ],
        },
        {
            name: "Cornellius Susanto",
            nickname: "Cornellius",
            role: "SUKMA UMN Festival",
            imageUrl:
                "/pngs/members/anggota/sukma/cornellius-susanto-01-studio.webp",
            portraitCrop: { x: 172, y: 145, width: 504 },
            gestureImageUrl:
                "/pngs/members/anggota/sukma/cornellius-susanto-gesture-studio.webp",
            gestureCrop: { x: 25, y: 97, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/cornellius-susanto-01-studio.webp",
                "/pngs/members/anggota/sukma/cornellius-susanto-gesture-studio.webp",
            ],
        },
        {
            name: "Hanna Pauline Haryono",
            nickname: "Hanna",
            role: "SUKMA Starlight",
            imageUrl:
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02-studio.webp",
            portraitCrop: { x: 131, y: 200, width: 475 },
            gestureImageUrl:
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-gesture-studio.webp",
            gestureCrop: { x: 25, y: 217, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-02-studio.webp",
                "/pngs/members/anggota/sukma/hanna-pauline-haryono-gesture-studio.webp",
            ],
        },
        {
            name: "Selena Clarisa Lesmana",
            nickname: "Selena",
            role: "SUKMA UMN ECO",
            imageUrl:
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01-studio.webp",
            portraitCrop: { x: 176, y: 120, width: 505 },
            gestureImageUrl:
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-gesture-studio.webp",
            gestureCrop: { x: 25, y: 114, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-01-studio.webp",
                "/pngs/members/anggota/sukma/selena-clarisa-lesmana-gesture-studio.webp",
            ],
        },
        {
            name: "Gven Carrey Gunawan",
            nickname: "Gven",
            role: "SUKMA OMB UMN",
            imageUrl:
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01-studio.webp",
            portraitCrop: { x: 132, y: 116, width: 522 },
            gestureImageUrl:
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-gesture-studio.webp",
            gestureCrop: { x: 25, y: 141, width: 700 },
            photos: [
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-01-studio.webp",
                "/pngs/members/anggota/sukma/gven-carrey-gunawan-gesture-studio.webp",
            ],
        },
    ],
};
