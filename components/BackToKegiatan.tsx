"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Shown only when the visitor arrived from the Kegiatan call to action
// (`?dari=kegiatan`), so a plain visit to this page has no stray button.
export function BackToKegiatan() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(
            new URLSearchParams(location.search).get("dari") === "kegiatan",
        );
    }, []);
    if (!show) return null;
    return (
        <Link
            href="/kegiatan"
            className="border-navy-dark/25 bg-concrete text-navy-dark hover:bg-pale-taupe fixed bottom-4 left-4 z-50 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-xs font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 sm:bottom-6 sm:left-6 sm:text-sm"
        >
            <ArrowLeft size={16} />
            <span>Kembali ke Kegiatan</span>
        </Link>
    );
}
