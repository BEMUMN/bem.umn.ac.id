import React from "react";

type WorkProps = {
    id: string;
    className?: string;
};

const Work = ({ id, className }: WorkProps) => {
    return (
        <section
            id={id}
            className={`text-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden ${className}`}
        >
            Work Section
        </section>
    );
};

export default Work;
