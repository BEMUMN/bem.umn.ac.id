/* eslint-disable @next/next/no-img-element -- These local assets are pre-encoded; native markup avoids an unnecessary hydration boundary. */
import type { ImgHTMLAttributes } from "react";

type Props = Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "alt" | "width" | "height"
> & {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
};

export default function LocalImage({
    alt,
    priority = false,
    loading,
    fetchPriority,
    decoding = "async",
    ...props
}: Props) {
    return (
        <>
            {priority && (
                <link
                    rel="preload"
                    as="image"
                    href={props.src}
                    imageSrcSet={props.srcSet}
                    imageSizes={props.sizes}
                    fetchPriority="high"
                />
            )}
            <img
                {...props}
                alt={alt}
                loading={loading ?? (priority ? "eager" : "lazy")}
                fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
                decoding={decoding}
            />
        </>
    );
}
