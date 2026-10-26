"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Peel from "@/components/Peel";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";

// End of a division page: one more screen of scroll turns the page back to the
// "Enam divisi, satu kabinet" spread on the home page.
export function PageTurnHome({ name }: { name: string }) {
    const router = useRouter();
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const peel = root.current?.querySelector<HTMLElement>("[data-peel]");
        if (!peel) return;
        // Armed only after the sheet was seen unpeeled, so landing here with a
        // restored scroll position (browser back) does not bounce straight home.
        let armed = false;
        let timer = 0;
        const check = () => {
            if (!peel.classList.contains("is-peeled")) {
                armed = true;
                window.clearTimeout(timer);
                timer = 0;
            } else if (armed && !timer) {
                timer = window.setTimeout(() => router.push("/#divisi"), 450);
            }
        };
        check();
        const observer = new MutationObserver(check);
        observer.observe(peel, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
        };
    }, [router]);

    return (
        <div ref={root} className="sc-home">
            <section
                data-sc-act="pin"
                data-sc-span="1.6"
                data-span-mobile="1.8"
                aria-label="Kembali ke beranda"
            >
                <div data-sc-stage>
                    <Peel
                        name="kembali"
                        from={0.1}
                        to={0.85}
                        rest={90}
                        hover
                        sheet={
                            <div className="turnback__sheet ground-navy">
                                <p className="turnback__cue">Akhir halaman</p>
                                <p className="turnback__title bem-display">
                                    Divisi {name} selesai di sini.
                                </p>
                                <p className="turnback__cue">
                                    Gulir untuk membuka halaman berikutnya
                                </p>
                            </div>
                        }
                        under={
                            <div className="under ground-navy">
                                <div className="under__copy">
                                    <h2 className="under__title bem-display">
                                        Enam divisi, satu kabinet.
                                    </h2>
                                    <p className="under__lead">
                                        Setiap divisi punya kursinya sendiri,
                                        dan semuanya menghadap panggung yang
                                        sama.
                                    </p>
                                    <Link
                                        href="/#divisi"
                                        className="turnback__link"
                                    >
                                        Kembali ke beranda
                                    </Link>
                                </div>
                            </div>
                        }
                    />
                </div>
            </section>
            <ScrollCraftMount />
        </div>
    );
}
