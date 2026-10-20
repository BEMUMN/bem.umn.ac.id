import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main
                id="main-content"
                tabIndex={-1}
                className="not-found container"
            >
                <div className="stack">
                    <p className="small">404 · BEM UMN</p>
                    <h1>Halaman belum ditemukan.</h1>
                    <p>
                        Periksa kembali alamatnya atau temukan informasi melalui
                        beranda.
                    </p>
                    <div className="actions">
                        <Link className="button" href="/">
                            Kembali ke beranda{" "}
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </Link>
                        <Link className="text-link" href="/kegiatan">
                            Lihat kegiatan{" "}
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
                <svg
                    viewBox="0 0 480 400"
                    className="missing-page-art"
                    aria-hidden="true"
                >
                    <path d="M90 50h240l80 80v220H90Z" fill="var(--azure)" />
                    <path
                        d="M90 50h240v80h80L270 200 90 350Z"
                        fill="var(--blue)"
                    />
                    <path d="m330 50 80 80h-80Z" fill="var(--paper-deep)" />
                    <path
                        d="M145 230h125m-125 32h85"
                        stroke="var(--paper)"
                        strokeWidth="2"
                    />
                </svg>
            </main>
            <Footer />
        </>
    );
}
