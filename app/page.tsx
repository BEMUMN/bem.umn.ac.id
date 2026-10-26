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
import Peel from "@/components/Peel";
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

            <div id="sampul">
                <section
                    data-sc-act="pin"
                    data-sc-span="2"
                    data-span-mobile="2.2"
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
            <Footer />

            <ScrollCraftMount />
        </main>
    );
}
