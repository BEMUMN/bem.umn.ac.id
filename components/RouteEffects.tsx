"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type DataNavigator = Navigator & { connection?: { saveData?: boolean } };

export default function RouteEffects() {
    const pathname = usePathname();
    const router = useRouter();
    const previous = useRef(pathname);
    const finish = useRef<(() => void) | null>(null);

    useLayoutEffect(() => {
        finish.current?.();
        finish.current = null;
        if (previous.current !== pathname) {
            previous.current = pathname;
            document
                .getElementById("main-content")
                ?.focus({ preventScroll: true });
        }
    }, [pathname]);

    useEffect(() => {
        const saveData = (navigator as DataNavigator).connection?.saveData;
        document.documentElement.toggleAttribute("data-save-data", !!saveData);
        const handleClick = (event: MouseEvent) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            )
                return;
            const anchor = (event.target as Element).closest<HTMLAnchorElement>(
                "a[href]",
            );
            if (!anchor || anchor.target || anchor.hasAttribute("download"))
                return;
            const url = new URL(anchor.href);
            if (
                url.origin !== location.origin ||
                url.pathname === location.pathname ||
                url.hash ||
                url.search
            )
                return;
            if (
                !document.startViewTransition ||
                saveData ||
                matchMedia("(prefers-reduced-motion: reduce)").matches ||
                finish.current
            )
                return;
            event.preventDefault();
            document.startViewTransition(
                () =>
                    new Promise<void>((resolve) => {
                        const timer = window.setTimeout(resolve, 2000);
                        finish.current = () => {
                            window.clearTimeout(timer);
                            resolve();
                        };
                        router.push(url.pathname);
                    }),
            );
        };
        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
            finish.current?.();
        };
    }, [router]);
    return null;
}
