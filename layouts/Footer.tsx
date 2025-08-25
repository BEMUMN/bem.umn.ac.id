import React from "react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-background mt-12 w-full py-4">
            <div className="mx-auto flex flex-col items-center justify-center gap-4 px-6 md:flex-row">
                {/* Left side */}
                <div>
                    <p className="text-md text-center font-mono">
                        &copy; {new Date().getFullYear()} BEM Universitas
                        Multimedia Nusantara reserved.
                    </p>
                    <p className="text-background/50 text-center font-mono text-sm">
                        Designed and Built by PR Division GEN XV
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
