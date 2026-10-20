import Image from "next/image";
import placeholders from "@/constants/photo-placeholders.json";

type Props = {
    name: string;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    eager?: boolean;
    className?: string;
};
export default function ResponsivePhoto({
    name,
    alt,
    width,
    height,
    sizes = "(max-width: 639px) 90vw, 45vw",
    eager = false,
    className,
}: Props) {
    const srcSet = (format: string) =>
        [480, 960, 1600]
            .map(
                (size) =>
                    `/images/${name}-${size}.${format} ${Math.min(size, width)}w`,
            )
            .join(", ");
    return (
        <picture className={className}>
            <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
            <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
            <Image
                src={`/images/${name}-960.webp`}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                placeholder="blur"
                blurDataURL={placeholders[name as keyof typeof placeholders]}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager ? "high" : undefined}
            />
        </picture>
    );
}
