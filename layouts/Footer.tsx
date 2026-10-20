import LocalImage from "@/components/LocalImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactConfig } from "@/constants/contactIndex";

export default function Footer() {
    return (
        <footer className="site-footer" id="kontak">
            <div className="container">
                <div className="footer-top">
                    <div>
                        <h2>Sekretariat &amp; kontak</h2>
                        <p>{contactConfig.description}</p>
                        <p className="mt-6">
                            {contactConfig.address.campus}
                            <br />
                            {contactConfig.address.full}
                        </p>
                        <a
                            className="text-link"
                            href={contactConfig.address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lihat lokasi{" "}
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </a>
                    </div>
                    <div>
                        <h2>Temukan kami</h2>
                        <div className="footer-links">
                            {contactConfig.socials.map((s) =>
                                s.isPlaceholder ? (
                                    <p className="contact-pending" key={s.id}>
                                        <span>{s.name}</span>
                                        <span>{s.handle}</span>
                                    </p>
                                ) : (
                                    <a
                                        key={s.id}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {s.name}{" "}
                                        <ArrowUpRight
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </a>
                                ),
                            )}
                        </div>
                        {contactConfig.channels.map((c) => (
                            <div className="contact-pending" key={c.id}>
                                <span>{c.name}</span>
                                {c.href && !c.isPlaceholder ? (
                                    <a href={c.href}>{c.value}</a>
                                ) : (
                                    <span>{c.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Jelajahi</h2>
                        <div className="footer-links">
                            <Link href="/">Beranda</Link>
                            <Link href="/tentang-kami">Tentang kami</Link>
                            <Link href="/divisi">Divisi &amp; anggota</Link>
                            <Link href="/kegiatan">
                                Kegiatan &amp; program kerja
                            </Link>
                        </div>
                        <p className="mt-6">{contactConfig.tagline}</p>
                    </div>
                </div>
                <p className="footer-wordmark" aria-hidden="true">
                    BEM UMN.
                </p>
                <div className="footer-bottom">
                    <div className="footer-logos">
                        <LocalImage
                            src="/svgs/WHITE_LOGO_BEM.svg"
                            width={36}
                            height={50}
                            alt="BEM UMN"
                        />
                        <LocalImage
                            src="/svgs/LOGO_UMN_WHITE.svg"
                            width={40}
                            height={50}
                            alt="Universitas Multimedia Nusantara"
                        />
                    </div>
                    <p>Copyright © 2026 BEM Gen XVI</p>
                    <p>Design &amp; Develop by BEM Gen XVI</p>
                </div>
            </div>
        </footer>
    );
}
