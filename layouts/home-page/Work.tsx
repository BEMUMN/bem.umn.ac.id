import React from "react";

type WorkProps = {
	id: string;
    className?: string;
};

const Work = ({ id, className }: WorkProps) => {
	return (
		<section
			id={id}
			className={`w-full min-h-screen flex justify-center items-center text-foreground relative overflow-hidden ${className}`}
		>
			Work Section
		</section>
	);
};

export default Work;
