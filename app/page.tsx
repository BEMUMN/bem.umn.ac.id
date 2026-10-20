import Navbar from "@/layouts/Navbar";
import Hero from "@/layouts/home-page/Hero";
import AboutPreview from "@/layouts/home-page/AboutPreview";
import Values from "@/layouts/home-page/Values";
import Work from "@/layouts/home-page/Work";
import Footer from "@/layouts/Footer";
import PeoplePreview from "@/layouts/home-page/PeoplePreview";

export default function Home() {
    return (
        <>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
                <Hero id="hero" />
                <Work id="kegiatan" />
                <AboutPreview id="tentang" />
                <PeoplePreview />
                <Values id="nilai" />
            </main>
            <Footer />
        </>
    );
}
