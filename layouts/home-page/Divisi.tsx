import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { divisions } from "@/constants/divisionIndex";

// A rail through the auditorium: lead, six plates, a closing note. The engine
// pans the rail from this act's --sc-p; settle/drift is CSS reading the same value.
export default function Divisi({ id }: { id: string }) {
    return (
        <section
            id={id}
            data-chapter="divisi"
            className="divisi"
            data-sc-act="pan"
            data-sc-span="2.6"
            data-span-mobile="3.4"
            aria-labelledby="divisi-title"
        >
            <div
                data-sc-stage
                className="divisi__stage ground-navy"
                role="region"
                aria-label="Enam divisi BEM UMN Gen XVI"
            >
                <div className="divisi__rail" data-sc-pan="0.06">
                    <div
                        className="item item--lead"
                        style={{ "--i": 0 } as React.CSSProperties}
                    >
                        <h2 id="divisi-title" className="divisi__title">
                            Enam divisi, satu kabinet.
                        </h2>
                        <p className="divisi__lead">
                            Setiap divisi punya kursinya sendiri, dan semuanya
                            menghadap panggung yang sama.
                        </p>
                    </div>

                    {divisions.map((d, i) => (
                        <article
                            key={d.id}
                            className="item plate"
                            style={{ "--i": i + 1 } as React.CSSProperties}
                            aria-labelledby={`plate-${d.id}`}
                        >
                            <div className="plate__frame">
                                <Image
                                    src={d.imageUrl}
                                    alt={`Foto divisi ${d.name}`}
                                    fill
                                    sizes="(max-width: 860px) 80vw, 26rem"
                                    priority={i < 2}
                                />
                            </div>
                            <div className="plate__head">
                                <h3 id={`plate-${d.id}`} className="plate__acr">
                                    {d.name}
                                </h3>
                                <Link
                                    className="plate__more"
                                    href={`/divisi/${d.id.toLowerCase()}`}
                                >
                                    Lihat divisi
                                    <span className="sr-only">
                                        {" "}
                                        {d.fullname}
                                    </span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                            <p className="plate__name">{d.fullname}</p>
                            <p className="plate__desc">{d.description}</p>
                        </article>
                    ))}

                    <div
                        className="item item--close"
                        style={
                            {
                                "--i": divisions.length + 1,
                            } as React.CSSProperties
                        }
                    >
                        <p className="divisi__closing">
                            Kenali setiap divisi lebih dekat.
                        </p>
                        <ul className="divisi__links">
                            {divisions.map((d) => (
                                <li key={d.id}>
                                    <Link
                                        href={`/divisi/${d.id.toLowerCase()}`}
                                    >
                                        <span className="sr-only">Divisi </span>
                                        {d.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
