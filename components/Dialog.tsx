"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = { open: boolean; title: string; id: string; onClose: () => void; children: ReactNode };
export default function Dialog({ open, title, id, onClose, children }: Props) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (!open) { if (dialog.open) dialog.close(); return; }
        const previousOverflow = document.body.style.overflow;
        const opener = document.activeElement as HTMLElement | null;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            opener?.focus({ preventScroll: true });
        };
    }, [open]);
    return <dialog ref={ref} className="site-dialog" aria-labelledby={id} onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]')).filter(node => node.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
        <div className="dialog-content"><div className="dialog-header"><h2 id={id}>{title}</h2><button className="icon-button" type="button" onClick={onClose} aria-label="Tutup jendela"><X size={22} aria-hidden="true" /></button></div>{children}</div>
    </dialog>;
}
