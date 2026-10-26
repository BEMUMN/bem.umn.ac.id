"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function ContentDialog({
    labelledBy,
    onClose,
    children,
    wide = false,
}: {
    labelledBy: string;
    onClose: () => void;
    children: ReactNode;
    wide?: boolean;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null;
        const dialog = ref.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog?.showModal();
        return () => {
            dialog?.close();
            document.body.style.overflow = previousOverflow;
            opener?.focus({ preventScroll: true });
        };
    }, []);
    return (
        <dialog
            ref={ref}
            aria-labelledby={labelledBy}
            onCancel={(e) => {
                e.preventDefault();
                onClose();
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            onKeyDown={(e) => {
                if (e.key !== "Tab") return;
                const targets = Array.from(
                    e.currentTarget.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
                    ),
                );
                const first = targets[0],
                    last = targets[targets.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }}
            className={`border-azure/30 bg-navy-dark m-auto max-h-[90dvh] w-[calc(100%-2rem)] ${wide ? "max-w-4xl" : "max-w-2xl"} overflow-hidden rounded-3xl border p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm`}
        >
            {children}
        </dialog>
    );
}
