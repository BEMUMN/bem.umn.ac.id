"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: content stays visible if JavaScript or motion is disabled.
export function PageMotion() {
    const pathname = usePathname();
    useEffect(() => {
        const selector = "[data-motion], .scroll-reveal, .tt-reveal";
        const seen = new WeakSet<Element>();
        const active = new Set<Animation>();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const connection = (
            navigator as Navigator & { connection?: { saveData?: boolean } }
        ).connection;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const element = entry.target as HTMLElement;
                    observer.unobserve(element);
                    if (seen.has(element)) continue;
                    seen.add(element);
                    element.dataset.motionSeen = "true";
                    if (
                        reduced.matches ||
                        connection?.saveData ||
                        !element.animate
                    )
                        continue;
                    const soft = element.dataset.motion === "soft";
                    const animation = element.animate(
                        [
                            {
                                opacity: 0.65,
                                transform: `translateY(${soft ? 0 : 12}px)`,
                            },
                            { opacity: 1, transform: "translateY(0)" },
                        ],
                        {
                            duration: soft ? 360 : 440,
                            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        },
                    );
                    animation.id = "content-entrance";
                    active.add(animation);
                    animation.finished
                        .catch(() => {})
                        .finally(() => active.delete(animation));
                }
            },
            { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
        );
        const watch = (root: Element) => {
            const elements = [
                ...(root.matches(selector) ? [root] : []),
                ...root.querySelectorAll(selector),
            ];
            for (const element of elements) {
                if (
                    !seen.has(element) &&
                    !element.parentElement?.closest(selector)
                )
                    observer.observe(element);
            }
        };
        watch(document.body);
        const mutations = new MutationObserver((records) => {
            for (const record of records)
                for (const node of record.addedNodes)
                    if (node instanceof Element) watch(node);
        });
        mutations.observe(document.body, { childList: true, subtree: true });
        const stop = () => {
            if (reduced.matches)
                for (const animation of active) animation.cancel();
        };
        reduced.addEventListener("change", stop);
        return () => {
            observer.disconnect();
            mutations.disconnect();
            reduced.removeEventListener("change", stop);
            for (const animation of active) animation.cancel();
        };
    }, [pathname]);
    return null;
}
