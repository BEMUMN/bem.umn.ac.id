import Navbar from "@/layouts/Navbar";
import Hero from "@/layouts/home-page/Hero";
import AboutPreview from "@/layouts/home-page/AboutPreview";
import Work from "@/layouts/home-page/Work";
import HomeNarrative from "@/layouts/home-page/HomeNarrative";
import Footer from "@/layouts/Footer";
import "./homepage.css";

export default function Home() {
    return (
        <div className="home-paper">
            <a className="home-skip" href="#tentang">Lewati pembuka</a>
            <Navbar revealAfterHeroId="hero" />
            <main id="home-content">
                <HomeNarrative>
                    <Hero id="hero" />
                    <AboutPreview id="tentang" />
                </HomeNarrative>
                <Work id="kegiatan" />
            </main>
            <Footer />
        </div>
    );
}
