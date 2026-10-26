"use client";

import { useEffect, useRef } from "react";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const GRAVITY = 1500; // px/s², a streak over half a screen lands in ~0.8s
const EVERY = 90; // px scrolled down per streak
const MAX_DROPS = 3;
const EASE = 7; // 1/s, how quickly the line catches up with the scroll
const FADE = 56; // px a streak takes to fade in after its start and out at the front

type Drop = { el: HTMLElement; y: number; v: number; from: number };

// The gutter of the open book (Nilai, desktop). Scrolling down fills it from
// the top: drops fall from the top of the screen and join the line at its
// front. Nothing runs while the reader is not scrolling or the line is off screen.
export function GutterThread() {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const fill = el.querySelector<HTMLElement>(".thread__fill")!;
        const head = el.querySelector<HTMLElement>(".thread__head")!;
        const desk = matchMedia("(min-width: 860px)");
        const reduce = matchMedia("(prefers-reduced-motion: reduce)");
        const drops: Drop[] = [];
        let h = 1;
        let target = 0;
        let shown = 0;
        let lastY = scrollY;
        let travel = 0;
        let inView = false;
        let raf = 0;
        let last = 0;

        const frame = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            // eased toward the scroll position, so wheel steps read as a pour;
            // exponential in dt, so it runs the same at 60 and 120 Hz
            shown +=
                (target - shown) * (reduce.matches ? 1 : 1 - Math.exp(-dt * EASE));
            if (Math.abs(target - shown) < 0.0004) shown = target;
            const front = shown * h;
            fill.style.transform = `scaleY(${shown.toFixed(4)})`;
            head.style.transform = `translate3d(0, ${front.toFixed(1)}px, 0)`;
            head.style.opacity = shown > 0.002 && shown < 0.998 ? "1" : "0";

            for (let i = drops.length - 1; i >= 0; i--) {
                const d = drops[i];
                d.v += GRAVITY * dt;
                d.y += d.v * dt;
                if (d.y >= front) {
                    d.el.remove();
                    drops.splice(i, 1);
                    continue;
                }
                // fades in after leaving the top and melts into the line at its front
                const a = Math.min((d.y - d.from) / FADE, (front - d.y) / FADE, 1);
                d.el.style.opacity = Math.max(a, 0).toFixed(3);
                d.el.style.transform = `translate3d(0, ${d.y.toFixed(1)}px, 0)`;
            }

            raf =
                shown !== target || drops.length
                    ? requestAnimationFrame(frame)
                    : 0;
        };
        const wake = () => {
            if (!raf) {
                last = performance.now();
                raf = requestAnimationFrame(frame);
            }
        };

        const spawn = (top: number) => {
            const start = Math.max(-top + 16, 0);
            if (drops.length >= MAX_DROPS || target * h - start < 120) return;
            const d = document.createElement("i");
            d.className = "thread__drop";
            d.style.opacity = "0";
            el.appendChild(d);
            drops.push({ el: d, y: start, v: 120, from: start });
        };

        const onScroll = () => {
            const dy = scrollY - lastY;
            lastY = scrollY;
            if (!inView || !desk.matches) return;
            const r = el.getBoundingClientRect();
            h = r.height || 1;
            // the front rides a little below the middle of the screen
            target = clamp01((innerHeight * 0.58 - r.top) / h);
            if (dy > 0 && !reduce.matches) {
                travel += dy;
                if (travel >= EVERY) {
                    travel = 0;
                    spawn(r.top);
                }
            }
            wake();
        };

        const io = new IntersectionObserver(([e]) => {
            inView = e.isIntersecting;
            if (inView) onScroll();
        });
        io.observe(el);
        addEventListener("scroll", onScroll, { passive: true });
        addEventListener("resize", onScroll, { passive: true });
        return () => {
            io.disconnect();
            removeEventListener("scroll", onScroll);
            removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
            drops.forEach((d) => d.el.remove());
        };
    }, []);

    return (
        <div ref={root} className="thread" aria-hidden="true">
            <span className="thread__fill" />
            <span className="thread__head" />
        </div>
    );
}
