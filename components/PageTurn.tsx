"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Peel from "@/components/Peel";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";

// End of a page: one more screen of scroll folds the blank sheet back from the
// bottom-right corner, shows `under`, then opens `href`.
export function PageTurn({
    href,
    label,
    under,
}: {
    href: string;
    label: string;
    under: ReactNode;
}) {
    const router = useRouter();
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const peel = root.current?.querySelector<HTMLElement>("[data-peel]");
        if (!peel) return;
        // Armed only after the sheet was seen unpeeled, so landing here with a
        // restored scroll position (browser back) does not bounce straight on.
        let armed = false;
        let timer = 0;
        const check = () => {
            if (!peel.classList.contains("is-peeled")) {
                armed = true;
                window.clearTimeout(timer);
                timer = 0;
            } else if (armed && !timer) {
                timer = window.setTimeout(() => router.push(href), 450);
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
    }, [router, href]);

    return (
        <div ref={root} className="sc-home">
            <section
                data-sc-act="pin"
                data-sc-span="1.4"
                data-span-mobile="1.6"
                aria-label={label}
            >
                <div data-sc-stage>
                    <Peel
                        name="lanjut"
                        from={0.08}
                        to={0.85}
                        rest={90}
                        hover
                        sheet={<div className="turnback__sheet ground-navy" />}
                        under={under}
                    />
                </div>
            </section>
            <ScrollCraftMount />
        </div>
    );
}
