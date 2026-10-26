"use client";

import { useEffect } from "react";

type ScrollCraftApi = { destroy: () => void };
type ScrollCraftGlobal = { mount: (root?: ParentNode) => ScrollCraftApi };

// Starts the scrollcraft engine + peels for the page it is rendered on and
// stops them on unmount, so inner routes pay nothing.
export function ScrollCraftMount() {
    useEffect(() => {
        let cancelled = false;
        let stop = () => {};

        // Both modules read matchMedia at load, so they must stay out of SSR.
        Promise.all([import("@/lib/scrollcraft"), import("@/lib/peel")]).then(
            ([, { initPeels }]) => {
                if (cancelled) return;
                // Phones get a longer span; the engine reads spans once, so set them first.
                if (matchMedia("(max-width: 860px)").matches) {
                    document
                        .querySelectorAll<HTMLElement>("[data-span-mobile]")
                        .forEach((el) =>
                            el.setAttribute(
                                "data-sc-span",
                                el.dataset.spanMobile!,
                            ),
                        );
                }
                const sc = (
                    window as unknown as { ScrollCraft: ScrollCraftGlobal }
                ).ScrollCraft;
                const api = sc.mount(document);
                const stopPeels = initPeels();
                // The engine sets act heights above the target after the router
                // already scrolled to the hash, so land on it again.
                if (location.hash.length > 1) {
                    const land = () =>
                        document
                            .getElementById(location.hash.slice(1))
                            ?.scrollIntoView({ behavior: "instant" });
                    land();
                    // Images and fonts settle after mount and move the target.
                    window.setTimeout(land, 400);
                }
                stop = () => {
                    api.destroy();
                    stopPeels();
                };
            },
        );

        return () => {
            cancelled = true;
            stop();
        };
    }, []);

    return null;
}
