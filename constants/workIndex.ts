export interface KegmaDetail {
    id: string;
    title: string;
    fullName: string;
    tagline: string;
    description: string;
    fullDescription: string;
    image: string;
    logo: string;
    gradient: string;
    websiteUrl: string;
    supervisor: string;
    division: string;
    category: string;
    highlights: string[];
}

export interface ProkerDetail {
    id: string;
    title: string;
    subtitle: string;
    division: string;
    description: string;
    fullDescription: string;
    image: string;
    gradient: string;
    objectives: string[];
}

export const subSections = [
    {
        id: "proker",
        title: "Program Kerja Divisi",
        desc: "BEM UMN merencanakan dan melaksanakan program kerja unggulan lintas divisi untuk mempererat sinergi organisasi dan kampus.",
    },
    {
        id: "kegma",
        title: "Kegiatan Mahasiswa",
        desc: "BEM UMN menaungi dan mengawasi 6 kegiatan besar mahasiswa Universitas Multimedia Nusantara.",
    },
    {
        id: "organisasi",
        title: "Naungan KBM UMN",
        desc: "BEM UMN bertindak sebagai lembaga eksekutif tertinggi yang menaungi Himpunan Mahasiswa, UKM, dan LSO.",
    },
];

export const prokerList: ProkerDetail[] = [
    {
        id: "sepatu-bem",
        title: "Sepatu BEM",
        subtitle: "Internal Capacity & Bond Building",
        division: "Badan Pengurus Harian & Internal",
        description: "Program pembekalan internal untuk mempererat sinergi, kekeluargaan, dan kesiapan pengurus BEM Gen XVI.",
        fullDescription: "Sepatu BEM merupakan program pengembangan internal yang dirancang khusus bagi seluruh fungsionaris BEM UMN Gen XVI. Melalui sesi pembekalan, team building, dan ruang refleksi bersama, Sepatu BEM memastikan seluruh anggota memiliki pemahaman visi yang selaras, fondasi kerja kolaboratif, serta kenyamanan emosional dalam menjalankan amanah satu periode kepengurusan.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Membangun bonding dan chemistry antardivisi BEM UMN Gen XVI",
            "Meningkatkan soft skills dan profesionalitas dalam manajemen organisasi",
            "Menyelaraskan nilai kepengurusan 'Inclusive for Innovation'",
        ],
    },
    {
        id: "stukm",
        title: "STUKM",
        subtitle: "Serah Tahunan UKM",
        division: "Supervisor Unit Kegiatan Mahasiswa (SUKM)",
        description: "Wadah evaluasi, apresiasi, dan kesinambungan regenerasi kepengurusan seluruh Unit Kegiatan Mahasiswa UMN.",
        fullDescription: "Serah Tahunan UKM (STUKM) adalah kegiatan tahunan yang diselenggarakan oleh divisi SUKM BEM UMN untuk memberikan apresiasi setinggi-tingginya kepada para pengurus UKM (Seni & Budaya, Olahraga, Sains & Sosial) generasi yang telah purnatugas. Di dalamnya berlangsung prosesi serah terima jabatan (sertijab) kepengurusan secara khidmat sebagai tonggak kesinambungan regenerasi organisasi.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Apresiasi dedikasi pengurus UKM selama satu periode penuh",
            "Serah terima jabatan resmi (sertijab) pengurus UKM baru",
            "Menjaga kontinuitas regenerasi dan tata kelola UKM yang sehat",
        ],
    },
    {
        id: "saa",
        title: "SAA",
        subtitle: "Student Association Awards",
        division: "Supervisor Fakultas (SUFAK)",
        description: "Penghargaan dan apresiasi resmi bagi seluruh Himpunan Mahasiswa di bawah naungan BEM UMN.",
        fullDescription: "Student Association Awards (SAA) adalah ajang tahunan yang diinisiasi oleh divisi SUFAK BEM UMN sebagai bentuk penghargaan dan pengakuan atas dedikasi, kerja keras, serta inovasi seluruh Himpunan Mahasiswa di 4 fakultas (Bisnis, Seni & Desain, Teknik & Informatika, Ilmu Komunikasi). SAA memotivasi himpunan untuk terus menyajikan program kerja yang berdampak nyata bagi mahasiswa.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Memberikan rekognisi atas dedikasi himpunan mahasiswa selama satu periode",
            "Mendorong standar keunggulan dan dampak program kerja mahasiswa",
            "Mempererat jejaring kolaboratif lintas himpunan dan fakultas di UMN",
        ],
    },
    {
        id: "bem-birthday",
        title: "BEM Birthday",
        subtitle: "Perayaan Hari Jadi BEM UMN",
        division: "Public Relations & Supervisor LSO",
        description: "Momen perayaan hari jadi BEM UMN untuk mempererat tali persaudaraan dan kebersamaan lintas generasi fungsionaris.",
        fullDescription: "BEM Birthday merupakan kegiatan tahunan yang diselenggarakan secara kolaboratif oleh Divisi Public Relations (PR) dan Divisi Supervisi LSO (SULSO). Program ini menjadi wadah silaturahmi, refleksi sejarah perjalanan organisasi, serta perayaan kebersamaan antarfungsionaris aktif maupun alumni pengurus BEM UMN dari generasi ke generasi.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Memperingati tonggak sejarah pendirian BEM UMN (17 November 2008)",
            "Menjalin silaturahmi erat fungsionaris aktif dengan alumni pengurus BEM",
            "Memupuk rasa kepemilikan dan kebanggaan terhadap almamater BEM UMN",
        ],
    },
    {
        id: "stuban",
        title: "STUBAN",
        subtitle: "Studi Banding Antarkampus",
        division: "Public Relations (PR Eksternal)",
        description: "Program studi banding dengan BEM perguruan tinggi lain untuk pertukaran wawasan tata kelola organisasi.",
        fullDescription: "STUBAN (Studi Banding) adalah program kerja BEM UMN di bawah naungan PR Eksternal yang bertujuan menjalin relasi kelembagaan, berdiskusi mengenai sistem kerja, dan mengadopsi best practices tata kelola organisasi kemahasiswaan dengan BEM dari berbagai universitas terkemuka.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Membuka wawasan sistem kerja dan inovasi tata kelola BEM kampus lain",
            "Memperluas jaringan kemitraan strategis antarmahasiswa se-Indonesia",
            "Mengevaluasi dan meningkatkan mutu internal BEM UMN secara berkelanjutan",
        ],
    },
    {
        id: "bem-takeover",
        title: "BEM Takeover",
        subtitle: "Media Engagement Story",
        division: "Public Relations (PR Internal)",
        description: "Pemberdayaan kanal komunikasi resmi BEM UMN oleh setiap divisi secara bergiliran.",
        fullDescription: "BEM Takeover memberi kesempatan bagi setiap divisi di BEM UMN untuk secara bergiliran mengelola media sosial resmi (Instagram Stories). Inisiatif ini mendekatkan BEM dengan mahasiswa UMN melalui transparansi aktivitas harian serta konten interaktif yang kreatif.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        objectives: [
            "Transparansi kegiatan divisi BEM kepada seluruh mahasiswa UMN",
            "Meningkatkan engagement publik dan kedekatan emosional dengan civitas kampus",
            "Wadah ekspresi kreatif fungsionaris BEM dalam memproduksi konten",
        ],
    },
];

export const prokers = prokerList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    gradient: p.gradient,
}));

export const kegmaList: KegmaDetail[] = [
    {
        id: "umn-next",
        title: "UMN NEXT",
        fullName: "UMN NEXT (Orientasi Mahasiswa Baru UMN)",
        tagline: "Langkah Awal Menempa Diri di Dunia Kampus",
        description: "Orientasi Mahasiswa Baru — Menanamkan nilai dan bekal memasuki dunia perkuliahan Universitas Multimedia Nusantara.",
        fullDescription: "UMN NEXT (sebelumnya dikenal sebagai OMB UMN) merupakan proses seremonial dan edukatif penyambutan mahasiswa baru di Universitas Multimedia Nusantara. Melalui serangkaian kegiatan yang terstruktur dan bermakna, mahasiswa baru dibantu beradaptasi dengan budaya akademik, mengeksplorasi potensi diri, serta ditanamkan nilai-nilai 5C Kompas Gramedia sebagai fondasi utama menempuh kehidupan perkuliahan.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_UMN_NEXT.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://omb.umn.ac.id/",
        supervisor: "Gven Carrey Gunawan",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Orientasi & Transisi Mahasiswa",
        highlights: [
            "Penyambutan resmi ribuan mahasiswa baru lintas fakultas",
            "Pembekalan wawasan akademik dan nilai budaya 5C Kompas Gramedia",
            "Pendampingan intensif dari fasilitator mahasiswa senior",
        ],
    },
    {
        id: "maxima",
        title: "MAXIMA",
        fullName: "Malam Expresi Mahasiswa (MAXIMA)",
        tagline: "Eksplorasi Minat, Bakat, dan Wadah Organisasi",
        description: "Malam Expresi Mahasiswa — Pameran dan pentas seni menyambut mahasiswa baru untuk mengenal UKM dan komunitas.",
        fullDescription: "MAXIMA (Malam Expresi Mahasiswa) adalah kegiatan mahasiswa di bawah naungan BEM UMN yang bertujuan memperkenalkan seluruh organisasi kampus, Unit Kegiatan Mahasiswa (UKM), dan Lembaga Semi Otonom (LSO) kepada mahasiswa baru. Melalui konsep pameran (STATE) dan puncak malam apresiasi (MALPEN), MAXIMA mengasah kreativitas, keberanian berekspresi, serta membuka jejaring antarmahasiswa.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_MAXIMA.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://maxima.umn.ac.id/",
        supervisor: "Sonny Ferdinand",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Eksplorasi Organisasi & Seni",
        highlights: [
            "Pameran puluhan UKM Seni Budaya, Olahraga, Sains & Komunitas",
            "Malam Puncak Ekspresi Seni dan Hiburan Mahasiswa",
            "Wadah registrasi anggota baru organisasi kemahasiswaan kampus",
        ],
    },
    {
        id: "umn-eco",
        title: "UMN ECO",
        fullName: "Earth Caring Operation (UMN ECO)",
        tagline: "Aksi Nyata untuk Kelestarian Lingkungan",
        description: "Earth Caring Operation — Gerakan kepedulian lingkungan berkelanjutan dengan aksi nyata dan dampak jangka panjang.",
        fullDescription: "UMN ECO (Earth Caring Operation) adalah gerakan inisiatif mahasiswa di bawah naungan BEM UMN yang berfokus pada pelestarian lingkungan hidup dan keberlanjutan bumi. Melalui edukasi interaktif, kampanye pengurangan limbah, serta aksi nyata di dalam maupun luar kampus, UMN ECO mengajak generasi muda untuk aktif menjadi agen perubahan bagi kelestarian alam sekitar.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_UMN_ECO.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://eco.umn.ac.id/",
        supervisor: "Selena Clarisa L.",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Sosial & Lingkungan Berkelanjutan",
        highlights: [
            "Gerakan pemilahan sampah dan konservasi energi di kampus",
            "Workshop gaya hidup minim sampah (zero waste lifestyle)",
            "Aksi penanaman pohon dan pemberdayaan masyarakat peduli lingkungan",
        ],
    },
    {
        id: "umn-festival",
        title: "UMN Festival",
        fullName: "UMN Festival (Perayaan Hari Jadi Kampus)",
        tagline: "Semarak Solidaritas dan Perayaan Dies Natalis Kampus",
        description: "Perayaan ulang tahun UMN untuk mempererat solidaritas seluruh civitas akademika melalui kompetisi dan hiburan.",
        fullDescription: "UMN Festival merupakan perhelatan akbar tahunan yang diselenggarakan dalam rangka memperingati Dies Natalis Universitas Multimedia Nusantara. Rangkaian kegiatannya dirancang untuk membangkitkan solidaritas, antusiasme, serta rasa memiliki di antara mahasiswa, dosen, staf, dan alumni melalui aneka kompetisi olahraga, panggung kesenian, dan konser penutup spektakuler.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_UMN_FESTIVAL.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://umnfestival.com/",
        supervisor: "Cornellius Susanto",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Festival Kampus & Kompetisi",
        highlights: [
            "Rangkaian turnamen olahraga antarmahasiswa dan fakultas",
            "Pentas seni, bazar kreatif, dan pameran interaktif",
            "Konser musik akbar penutup Dies Natalis UMN",
        ],
    },
    {
        id: "mister-miss-umn",
        title: "Mister & Miss UMN",
        fullName: "Mister & Miss UMN (Duta Kampus UMN)",
        tagline: "Inspirasi Teladan Intelektual, Karakter, dan Talenta",
        description: "Ajang pencarian duta kampus teladan yang membawa dampak positif dan inspirasi bagi civitas akademika UMN.",
        fullDescription: "Mister & Miss UMN adalah ajang pemilihan representasi dan duta resmi mahasiswa Universitas Multimedia Nusantara. Melalui tahapan seleksi ketat meliputi pembekalan etika, kepemimpinan, wawasan akademik, serta advokasi sosial, finalis terpilih mengemban tanggung jawab menyuarakan pesan inspiratif dan berkontribusi nyata bagi kemajuan kampus serta masyarakat.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_MISTER_MISS.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://mrms.umn.ac.id/",
        supervisor: "Vassel Goleyu",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Duta Kampus & Kepemimpinan",
        highlights: [
            "Pemilihan figur teladan mahasiswa berkarakter 5C",
            "Advokasi sosial dan kampanye edukasi positif di lingkungan kampus",
            "Malam penobatan finalis duta resmi Universitas Multimedia Nusantara",
        ],
    },
    {
        id: "starlight",
        title: "Starlight",
        fullName: "Starlight UMN (Pentas Bakat & Seni)",
        tagline: "Panggung Puncak Ekspresi Minat dan Bakat Seni",
        description: "Wadah penyaluran dan pengembangan potensi minat serta bakat individu mahasiswa di bidang seni dan hiburan.",
        fullDescription: "Starlight adalah wadah eksplorasi dan pertunjukan seni di bawah naungan BEM UMN yang diperuntukkan bagi mahasiswa yang ingin mengembangkan serta menampilkan bakat terbaiknya. Mengusung keyakinan bahwa setiap individu memiliki sinar keunikannya masing-masing, Starlight menghadirkan panggung profesional untuk mendorong rasa percaya diri dan apresiasi karya seni.",
        image: "/pngs/gallery/background.webp",
        logo: "/svgs/logo_kegma/LOGO_STARLIGHT.webp",
        gradient: "from-navy-dark/95 via-navy-blue/60 to-transparent",
        websiteUrl: "https://www.starlightumn2026.com/",
        supervisor: "Hanna Pauline H.",
        division: "Supervisor Kegiatan Mahasiswa (SUKMA)",
        category: "Pentas Seni & Bakat",
        highlights: [
            "Audisi dan inkubasi bakat seni mahasiswa (musik, tari, vokal)",
            "Tata panggung dan pertunjukan audio visual profesional",
            "Apresiasi ekspresi kreatif mahasiswa tanpa batas",
        ],
    },
];

export const kegma = kegmaList.map((k) => ({
    id: k.id,
    title: k.title,
    description: k.description,
    image: k.image,
    gradient: k.gradient,
}));

export const lainnya = [
    {
        id: "lain1",
        title: "Himpunan Mahasiswa",
        description: "Menaungi himpunan di Fakultas Bisnis, Seni Desain, Teknik & Informatika, dan Ilmu Komunikasi.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/90 via-navy-blue/50 to-transparent",
    },
    {
        id: "lain2",
        title: "Unit Kegiatan Mahasiswa",
        description: "Menaungi puluhan UKM kategori Seni & Budaya, Olahraga, serta Sains & Sosial.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/90 via-navy-blue/50 to-transparent",
    },
    {
        id: "lain3",
        title: "Lembaga Semi Otonom",
        description: "Membimbing LSO: U-Biz, U-Store, Duta Anti Narkoba, KOMPAS Corner, dan UMC.",
        image: "/pngs/gallery/background.webp",
        gradient: "from-navy-dark/90 via-navy-blue/50 to-transparent",
    },
];
