import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { divisions } from "@/constants/divisionIndex";
import ResponsivePhoto from "@/components/ResponsivePhoto";

export default function PeoplePreview() {
    return <section className="people-preview section" aria-labelledby="people-title"><div className="container people-layout"><div><div className="section-head"><h2 id="people-title">Divisi &amp;<br />anggota.</h2></div><p>Masing-masing divisi mengemban mandat manajerial khusus demi menjamin kelancaran operasional, pembinaan organisasi mahasiswa, dan relasi publik.</p><div className="directory-links">{divisions.map(d => <Link className="directory-link" key={d.id} href={`/divisi/${d.id.toLowerCase()}`}><strong>{d.name}</strong><span>{d.fullname}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div><Link className="text-link" href="/divisi">Buka direktori pengurus <ArrowUpRight size={18} aria-hidden="true" /></Link></div><figure><div className="people-photo"><ResponsivePhoto name="divisi-bph" alt="Foto grup Badan Pengurus Harian BEM UMN" width={1446} height={2576} /></div><figcaption className="hero-caption">Badan Pengurus Harian · Generasi XVI</figcaption></figure></div></section>;
}
