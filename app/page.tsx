import "./home-scroll.css";
import Navbar from "@/layouts/Navbar";
import Cover from "@/layouts/home-page/Cover";
import HalamanBaru from "@/layouts/home-page/HalamanBaru";
import Spread from "@/layouts/home-page/Spread";
import Nilai from "@/layouts/home-page/Nilai";
import Kabinet from "@/layouts/home-page/Kabinet";
import Divisi from "@/layouts/home-page/Divisi";
import Work from "@/layouts/home-page/Work";
import Footer from "@/layouts/Footer";
import { PageTurn } from "@/components/PageTurn";
import Peel from "@/components/Peel";
import { BackToKegiatan } from "@/components/BackToKegiatan";
import { ChapterTabs } from "@/components/ChapterTabs";
import { ScrollCraftMount } from "@/components/ScrollCraftMount";

// Chapters follow bem-umn-gen-xvi-main: Sampul (cover peel + Halaman Baru) >
// Nilai > Kabinet (peel, the peak) > Divisi (rail) > Kegiatan > back cover.
// overflow-x-clip, not hidden: hidden would break the sticky pinned stages.
export default function Home() {
    return (
        <main className="sc-home bg-navy-dark selection:bg-azure selection:text-navy-dark relative min-h-screen w-full overflow-x-clip text-white">
            <div className="super-bg absolute inset-0 -z-30 bg-cover bg-center opacity-30" />

            <div data-sc-progress aria-hidden="true" />
            <Navbar compact />
            <ChapterTabs />
            <BackToKegiatan />

            <div id="sampul">
                <section
                    data-sc-act="pin"
                    data-sc-span="3.5"
                    data-span-mobile="3.7"
                    aria-label="Sampul"
                >
                    <div data-sc-stage>
                        <Peel
                            name="sampul"
                            from={0.05}
                            to={0.6}
                            rest={120}
                            hover
                            sheet={<Cover />}
                            under={<HalamanBaru />}
                        />
                    </div>
                </section>
                <Spread />
            </div>

            <Nilai id="nilai" />
            <Kabinet id="kabinet" />
            <Divisi id="divisi" />
            <Work id="kegiatan" className="gnd-linen" />
            {/* The footer scrolls in, then a copy stacked over its last screen
                pins and folds back onto the cover. The cover underneath is the
                top of this page at rest (same corner fold, same art position),
                so the jump back up does not show. */}
            <div className="turn-end">
                <Footer />
                <PageTurn
                    mount={false}
                    href="/"
                    label="Kembali ke sampul"
                    // a long pull, so the loop to the cover is never by accident
                    span={6}
                    sheet={<Footer />}
                    under={
                        <Peel
                            name="sampul-end"
                            from={2}
                            to={2}
                            rest={120}
                            sheet={<Cover still />}
                            under={<HalamanBaru />}
                        />
                    }
                />
            </div>

            <ScrollCraftMount />
        </main>
    );
}
