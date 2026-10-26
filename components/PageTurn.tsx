"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Peel from "@/components/Peel";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";

// Back to the top of the same page. The revealed `under` is drawn to match the
// top exactly, so the jump itself is invisible; what is left of a wheel or
// trackpad fling is swallowed, or it would start folding the cover at once.
function loopToTop() {
    const html = document.documentElement;
    html.classList.add("sc-looping");
    window.scrollTo({ top: 0, behavior: "instant" });
    const until = performance.now() + 1200;
    let quiet = 0;
    const done = () => {
        window.clearTimeout(quiet);
        removeEventListener("wheel", hold);
    };
    const hold = (e: WheelEvent) => {
        if (performance.now() > until) return done();
        e.preventDefault();
        window.clearTimeout(quiet);
        quiet = window.setTimeout(done, 180);
    };
    addEventListener("wheel", hold, { passive: false });
    quiet = window.setTimeout(done, 180);
    // lets the progress line run back instead of snapping (home-scroll.css)
    window.setTimeout(() => html.classList.remove("sc-looping"), 700);
    return done;
}

// End of a page: the last screen is pinned as a sheet (a copy of what is above
// it); more scroll folds it back from the bottom-right corner, shows `under`,
// then opens `href`, or loops to the top when `href` is this page.
export function PageTurn({
    href,
    label,
    sheet,
    under,
    span = 1.2,
    mount = true,
}: {
    href: string;
    label: string;
    sheet: ReactNode;
    under: ReactNode;
    // viewport-heights of scroll the fold takes
    span?: number;
    // false when the page already mounts the engine itself (the home page)
    mount?: boolean;
}) {
    const router = useRouter();
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const peel = root.current?.querySelector<HTMLElement>("[data-peel]");
        if (!peel) return;
        // The copy stays clickable but is not a second set of tab stops.
        peel.querySelectorAll<HTMLElement>(
            ".peel__sheet :is(a, button, input, [tabindex])",
        ).forEach((el) => (el.tabIndex = -1));
        const loop = location.pathname === href;
        if (!loop) router.prefetch(href);
        // Armed only after the sheet was seen unpeeled, so landing here with a
        // restored scroll position (browser back) does not bounce straight on.
        let armed = false;
        let timer = 0;
        let release = () => {};
        const check = () => {
            if (!peel.classList.contains("is-peeled")) {
                armed = true;
                window.clearTimeout(timer);
                timer = 0;
            } else if (armed && !timer) {
                // Another page holds a beat on its preview while the route opens.
                timer = window.setTimeout(
                    () => (loop ? (release = loopToTop()) : router.push(href)),
                    loop ? 0 : 350,
                );
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
            release();
        };
    }, [router, href]);

    return (
        <div ref={root} className="sc-home">
            <section
                data-sc-act="pin"
                data-sc-span={span}
                data-span-mobile={span + 0.05}
                aria-label={label}
            >
                <div data-sc-stage>
                    <Peel
                        name="lanjut"
                        from={0.02}
                        to={0.9}
                        rest={90}
                        hover
                        inertUnder
                        sheet={
                            <div
                                className="turnback__sheet ground-navy"
                                aria-hidden="true"
                            >
                                {sheet}
                            </div>
                        }
                        under={under}
                    />
                </div>
            </section>
            {mount && <ScrollCraftMount />}
        </div>
    );
}
